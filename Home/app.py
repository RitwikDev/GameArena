from flask import Flask, render_template, request, json, redirect
from flaskext.mysql import MySQL
from flask import session
import hashlib, binascii, os

app = Flask(__name__)

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'gamesdatabase'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 8889
mysql.init_app(app)

app.secret_key = 'secret key can be anything!'

def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

def verify_password(stored_password, provided_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

@app.route("/")
def main():
    if session.get('user'):
        return render_template('index.html', status=str(True))
    else:
        return render_template('index.html', status=str(False))

@app.route("/adminIndex")
def adminIndex():
    if session.get('user'):
        return render_template('adminIndex.html')
    else:
        return render_template('login.html')

@app.route('/showSignup')
def showSignUp():
    return render_template('signup.html')

@app.route('/showLogin')
def showSignin():
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect('/')

@app.route('/userHome')
def userHome():
    if session.get('user'):
        return render_template('index.html', status=str(True))
    else:
        return render_template('index.html', status=str(False))

@app.route('/validateLogin', methods=['POST'])
def validateLogin():
    try:
        _username = request.form['username']
        _password = request.form['password']

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user WHERE username = %s", (_username))
        data = cursor.fetchall()

        if len(data) > 0:
            if verify_password(data[0][3], _password):
                session['user'] = data[0][0]
                # return redirect('/')
                return json.dumps({'message': data, 'admin': str(False)})
            else:
                return json.dumps({'message': 'Wrong credentials'})
        else:
            cursor.execute("SELECT * FROM administrator WHERE username = %s", (_username))
            data = cursor.fetchall()

            if len(data) > 0:
                if verify_password(data[0][3], _password):
                    session['user'] = data[0][0]
                    # return redirect('/')
                    return json.dumps({'message': data, 'admin': str(True)})
                else:
                    return json.dumps({'message': 'Wrong credentials'})
            else:
                return json.dumps({'message': 'Wrong credentials'})

    except Exception as e:
        # return render_template('error.html', error = str(e))
        return json.dumps({'message': 'Wrong credentials'})

    finally:
        cursor.close()
        con.close()

    
@app.route('/signup',methods=['POST'])
def signUp():
 
    # read the posted values from the UI
    _firstName = request.form['firstName']
    _lastName = request.form['lastName']
    _emailId = request.form['emailId']
    _username = request.form['username']
    _password = request.form['password']
    _dateOfBirth = request.form['dateOfBirth']
    _gender = request.form['genderRadio']

    _passwordHash = hash_password(_password)
    
    # validate the received values
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO user VALUES (%s, %s, %s, %s, %s, %s, %s)", ( _username, _firstName, _lastName, _passwordHash, _dateOfBirth, _emailId, _gender))
    
    data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        # return redirect('/')
        return json.dumps({'message': 'User created successfully!'})
    else:
        return json.dumps({'message': str(data[0])})


@app.route('/loadFeaturedGamesImages')
def loadFeaturedGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT GameId FROM featuredgames where featured = 1")
        data = cursor.fetchall()

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, i.ImageId, i.ImageSrc FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+") and g.Deleted = 0"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/checkUsername', methods=['POST'])
def checkUsername():
    try:
        _username = request.get_data()
        _username = _username.decode("utf-8")

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user u, administrator a WHERE u.Username = %s or a.Username = %s", (_username, _username))
        data = cursor.fetchall()

        return json.dumps({'response': data})

    except Exception as e:
        return render_template('error.html', error = str(e))
    finally:
        cursor.close()
        con.close()

@app.route('/search', methods=['POST'])
def search():
    try:
        _searchTerm = request.get_data()
        _searchTerm = _searchTerm.decode("utf-8")
        
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("select g.*, i.ImageSrc, i.ImageAlt from game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameName like \'%"+_searchTerm+"%\'")
        data = cursor.fetchall()

        return (json.dumps(data))
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/showSearch', methods=['POST'])
def showSearch():
    _searchTerm = request.form['searchField']

    if session.get('user'):
        return render_template('search.html', searchTerm = str(_searchTerm), status=str(True))
    else:
        return render_template('search.html', searchTerm = str(_searchTerm), status=str(False))

@app.route('/showDetails')
def showDetails():
    _gameId = request.args.get('gameId')

    if session.get('user'):
        return render_template('details.html', gameId = str(_gameId), status=str(True))
    else:
        return render_template('details.html', gameId = str(_gameId), status=str(False))

@app.route('/details', methods=['POST'])
def details():
    try:
        _gameId = request.get_data()
        
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("select g.*, i.ImageSrc, i.ImageAlt, i.ImageId from game g inner join image i on g.GameId = i.GameId where g.GameId = %s", (_gameId))
        data = cursor.fetchall()

        return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/addToCart')
def addToCart():
    if session.get('user'):
        try:
            _gameId = request.args.get('gameId')
            _userId = session.get('user')

            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("INSERT INTO cart VALUES (%s, %s)", (_userId, _gameId))
            data = cursor.fetchall()

            if len(data) == 0:
                conn.commit()
                # return redirect('/')
                return redirect('/showCart')
            else:
                return render_template('error.html', error=data)
        
        except:
            return render_template('error.html', error='Some error occurred')
    else:
        return redirect('/showLogin')

@app.route("/showCart")
def showCart():
    if session.get('user'):
        return render_template('cart.html')
    else:
        return redirect('/showLogin')

@app.route('/getCartContents')
def getCartContents():    
    try:
        if session.get('user'):
            _userId = session.get('user')
            
            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("select GameId from cart where UserId = %s", (_userId))
            data = cursor.fetchall()

            if len(data) > 0:
                _gameIds = list(sum(data, ()))
                _gameIdsString = '\',\''.join(_gameIds)
                _gameIdsString = '\''+_gameIdsString+'\''

                _query = "select GameName, Price, GameId from game where Deleted = 0 and GameId in ("+_gameIdsString+")"
                cursor.execute(_query)
                data = cursor.fetchall()
                return json.dumps({'message': data})
            
            else:
                return json.dumps({'message': 'Cart is empty'})
        
        else:
            return render_template('error.html', error = str(e))
        
    except Exception as e:
            return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()
@app.route('/removeFromCart', methods=['POST'])
def removeFromCart():
    if session.get('user'):
        try:
            _gameId = str(request.get_data().decode("utf-8"))
            _userId = str(session.get('user'))

            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("DELETE FROM cart WHERE UserID = %s AND GameID = %s", (_userId, _gameId))
            data = cursor.fetchall()

            if len(data) == 0:
                conn.commit()
                # return redirect('/')
                return redirect('/showCart')
            else:
                return render_template('error.html', error=data)
        
        except:
            return render_template('error.html', error='Some error occurred')
    else:
        return redirect('/showLogin')

@app.route('/checkUserCartPurchased', methods=['POST'])
def checkUserCartPurchased():
    if session.get('user'):
        try:
            _gameId = request.get_data()
            _userId = session.get('user')

            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM cart WHERE UserId = %s AND GameId = %s", (_userId, _gameId))
            data = cursor.fetchall()

            if len(data) > 0:
                return json.dumps({'message': "in cart"})
            else:
                cursor.execute("SELECT * FROM purchased WHERE UserId = %s AND GameId = %s", (_userId, _gameId))
                data = cursor.fetchall()

                if len(data) > 0:
                    return json.dumps({'message': "purchased"})
                else:
                    return json.dumps({'message': "new"})
        
        except:
            return render_template('error.html', error='Some error occurred')
    else:
        return json.dumps({'messsage': False})

@app.route('/getAllGames')
def getAllGames():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("select g.*, i.ImageSrc, i.ImageAlt, i.ImageId from game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0")
        data = cursor.fetchall()

        return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route("/addGame")
def addGame():
    if session.get('user'):
        return render_template('adminAddGame.html')
    else:
        return redirect('/showLogin')

@app.route('/getGenres')
def getGenres():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("SELECT DISTINCT Genre FROM gamegenre")
        data = cursor.fetchall()

        return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/showAdminSearch', methods=['POST'])
def showAdminSearch():
    _searchTerm = request.form['searchField']

    if session.get('user'):
        return render_template('adminSearch.html', searchTerm = str(_searchTerm), status=str(True))
    else:
        return redirect('/showLogin')

@app.route('/showAdminUpdateGame')
def showAdminUpdateGame():
    if session.get('user'):
        _gameId = request.args.get('gameId')
        _gameName = request.args.get('gameName')
        return render_template('adminUpdateGame.html', gameId=str(_gameId), gameName=str(_gameName))
    else:
        return redirect('/showLogin')

@app.route('/deleteGame', methods=['POST'])
def deleteGame():
    try:
        _gameId = str(request.get_data().decode("utf-8"))

        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("UPDATE game SET Deleted = 1 WHERE GameID = %s", (_gameId))
        data = cursor.fetchall()

        if len(data) == 0:
            conn.commit()
            # return redirect('/')
            return json.dumps({'message': 'Deleted'})
        else:
            return render_template('error.html', error=data)
    
    except:
        return render_template('error.html', error='Some error occurred')

@app.route('/addNewGame', methods=['POST'])
def addNewGame():
    # read the posted values from the UI
    _name = request.form['name']
    _price = request.form['price']
    _description = request.form['description']
    _images = request.form['imagesListHidden']
    _coverImage = request.form['coverImageListHidden']
    _genre = request.form['genreHidden']
    
    # validate the received values
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("SELECT GameId FROM game ORDER BY GameId DESC LIMIT 1")
    data = cursor.fetchall()

    _gameId = data[0][0]
    _gameIdInt = int(_gameId[1:])+1
    _gameId = 'G0'+str(_gameIdInt)

    cursor.execute("SELECT ImageId FROM image ORDER BY ImageId DESC LIMIT 1")
    data = cursor.fetchall()

    _imageId = data[0][0]
    _imageIdInt = int(_imageId[1:])+1
    _imageId = 'Z0'+str(_imageIdInt)

    cursor.execute("INSERT INTO game (GameId, GameName, GameDescription, Price, CoverImage, Deleted) VALUES (%s, %s, %s, %s, %s, 0)", (_gameId, _name, _description, _price, _imageId))
    data = cursor.fetchall()

    cursor.execute("INSERT INTO image VALUES (%s, %s, %s, %s)", (_imageId, _coverImage, _name, _gameId))
    data = cursor.fetchall()

    _imagesList = _images.split(",")
    for i in _imagesList:
        _imageIdInt = _imageIdInt + 1
        _imageId = 'Z0'+str(_imageIdInt)
        cursor.execute("INSERT INTO image VALUES (%s, %s, %s, %s)", (_imageId, i, _name, _gameId))
        data = cursor.fetchall()

    _genreList = _genre.split(",")
    for i in _genreList:
        cursor.execute("INSERT INTO gamegenre VALUES (%s, %s)", (_gameId, i))
        data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        # return redirect('/')
        return json.dumps({'message': 'Successful'})
    else:
        return json.dumps({'message': str(data[0])})


@app.route('/updateGame', methods=['POST'])
def updateGame():
    # read the posted values from the UI
    _gameId = request.form['gameId']
    _name = request.form['name']
    _price = request.form['price']
    _description = request.form['description']
    _images = request.form['imagesListHidden']
    _coverImage = request.form['coverImageListHidden']
    _genre = request.form['genreHidden']
    _featured = request.form['hiddenFeatured']

    print(_gameId)
    print(_name)
    print(_price)
    print(_description)
    print(_images, ' size = ', len(_images))
    print(_coverImage, ' size = ', len(_coverImage))
    print(_genre, ' size = ', len(_genre))
    print('ch = ', (request.form['hiddenFeatured'] == ''))
    
    conn = mysql.connect()
    cursor = conn.cursor()

    if _featured == '0' or _featured == '1':
        cursor.execute("UPDATE featuredgames set Featured = %s WHERE gameId = %s", (int(_featured), _gameId))
        data = cursor.fetchall()

    if len(_coverImage) > 0:
        cursor.execute("SELECT ImageId FROM image ORDER BY ImageId DESC LIMIT 1")
        data = cursor.fetchall()

        _imageId = data[0][0]
        print('got imageId ', _imageId)
        _imageIdInt = int(_imageId[1:])+1
        _imageId = 'Z0'+str(_imageIdInt)

        print('fromed imageId ', _imageId)

        cursor.execute("INSERT INTO image VALUES (%s, %s, %s, %s)", (_imageId, _coverImage, _name, _gameId))
        data = cursor.fetchall()
        print('inserted coverImg')
        
        if len(data) == 0:
            cursor.execute("SELECT CoverImage FROM game WHERE GameId = %s", (_gameId))
            dataTemp = cursor.fetchall()
            print('got coverImg')
            
            cursor.execute("UPDATE game SET GameName = %s, GameDescription = %s, Price = %s, CoverImage = %s where GameId = %s", (_name, _description, _price, _imageId, _gameId))
            data = cursor.fetchall()
            print('updated coverImg')

            if len(data) == 0:
                print('Before del coverImg')
                cursor.execute("DELETE FROM image where ImageId in %s", (dataTemp))
                data = cursor.fetchall()
                print('After del coverImg')
    
    else:
        cursor.execute("UPDATE game SET GameName = %s, GameDescription = %s, Price = %s where GameId = %s", (_name, _description, _price, _gameId))
        data = cursor.fetchall()

    if len(_images) > 0:
        cursor.execute("select i.ImageId from image i inner join game g on i.GameId = g.GameId where i.ImageId != g.CoverImage and g.GameId = %s", (_gameId))
        dataTemp = cursor.fetchall()
        print('selected data = ', dataTemp)
        _temp = list(sum(dataTemp, ()))
        _temps = '\',\''.join(_temp)
        _temps = '\''+_temps+'\''

        _imagesList = _images.split(",")
        cursor.execute("SELECT ImageId FROM image ORDER BY ImageId DESC LIMIT 1")
        data = cursor.fetchall()
        _imageId = data[0][0]
        print('imageId = ', _imageId)

        for i in _imagesList:
            _imageIdInt = int(_imageId[1:])+1
            _imageId = 'Z0'+str(_imageIdInt)

            print('Before ins')
            cursor.execute("INSERT INTO image VALUES (%s, %s, %s, %s)", (_imageId, i, _name, _gameId))
            data = cursor.fetchall()
            print('after ins')
        
        if len(data) == 0:
            _query = "DELETE FROM image WHERE ImageId IN ("+_temps+")"
            print('before del = ', _query)
            cursor.execute(_query)
            data = cursor.fetchall()
            print('no')

    cursor.execute("DELETE FROM gamegenre WHERE GameId = %s", (_gameId))
    data = cursor.fetchall()
    _genreList = _genre.split(",")
    for i in _genreList:
        cursor.execute("INSERT INTO gamegenre VALUES (%s, %s)", (_gameId, i))
        data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        # return redirect('/')
        return json.dumps({'message': 'Successful'})
    else:
        return json.dumps({'message': str(data[0])})

#S2
@app.route('/loadActionGamesImages')
def loadActionGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        genre = 'Action'
        cursor.execute("SELECT GameId FROM gamegenre where genre = %s", genre)
        data = cursor.fetchall()

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

#S2
@app.route('/loadAdventureGamesImages')
def loadAdventureGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        genre = 'Adventure'
        cursor.execute("SELECT GameId FROM gamegenre where genre = %s", genre)
        data = cursor.fetchall()

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

#S2
@app.route('/loadShootingGamesImages')
def loadShootingGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        genre = 'Shooting'
        cursor.execute("SELECT GameId FROM gamegenre where genre = %s", genre)
        data = cursor.fetchall()

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

#S2
@app.route('/loadRacingGamesImages')
def loadRacingGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        genre = 'Racing'
        cursor.execute("SELECT GameId FROM gamegenre where genre = %s", genre)
        data = cursor.fetchall()

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()


#S2
@app.route('/loadRPGGamesImages')
def loadRPGGamesImages():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        genre = 'RPG'
        cursor.execute("SELECT GameId FROM gamegenre where genre = %s", genre)
        data = cursor.fetchall()

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.Deleted = 0 and g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/showAdminDetails')
def showAdminDetails():
    _gameId = request.args.get('gameId')

    if session.get('user'):
        return render_template('adminDetails.html', gameId = str(_gameId))
    else:
        return render_template('login.html')

@app.route('/getGameDetails', methods=['POST'])
def getGameDetails():
    try:
        _gameId = request.get_data()

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("select * from game g inner join gamegenre gg on g.GameId = gg.GameId left outer join featuredgames f on f.gameid = g.gameid where g.Deleted = 0 and g.GameId = %s", (_gameId))
        data = cursor.fetchall()

        return json.dumps({'response': data})

    except Exception as e:
        return render_template('error.html', error = str(e))
    finally:
        cursor.close()
        con.close()


@app.route("/buyNow")
def buyNow():
    if session.get('user'):
        try:
            _userId = session.get('user')

            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("insert into purchased select * from cart where UserId = %s", (_userId))
            data = cursor.fetchall()

            if len(data) == 0:
                cursor.execute("delete from cart where UserId = %s", (_userId))
                data = cursor.fetchall()

                if len(data) == 0:
                    conn.commit()
                    return json.dumps({'message': 'successful'})

                else:
                    return json.dumps({'message': str(data[0])})
                    
            else:
                return json.dumps({'message': str(data[0])})

        except Exception as e:
            return render_template('error.html', error = str(e))

        finally:
            cursor.close()
            conn.close()

    else:
        return redirect('/showLogin')

@app.route("/showLibrary")
def showLibrary():
    if session.get('user'):
        return render_template('library.html')
    else:
        return redirect('/showLogin')

@app.route('/library')
def library():
    try:
        _userId = session.get('user')

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT p.*, i.ImageSrc, i.ImageAlt, g.gameName, g.gameDescription, g.price, g.rating from purchased p inner join game g on p.gameId = g.gameId inner join image i on g.coverImage = i.imageId where p.userId = %s", (_userId))
        data = cursor.fetchall()

        if len(data) > 0:
            return json.dumps({'response': data})

    except Exception as e:
        return render_template('error.html', error = str(e))
    finally:
        cursor.close()
        con.close()


if __name__ == "__main__":
    app.run()