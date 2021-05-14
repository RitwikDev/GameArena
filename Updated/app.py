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
    # return render_template('index.html')
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
            print('username = ', _username)
            print('password = ', _password)
            cursor.execute("SELECT * FROM administrator WHERE username = %s", (_username))
            data = cursor.fetchall()
            print('data = ', data[0][3])

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

        print('featured = ', data)

        if len(data) > 0:
            _gameIds = list(sum(data, ()))
            _gameIdsString = '\',\''.join(_gameIds)
            _gameIdsString = '\''+_gameIdsString+'\''

            _query = "SELECT g.GameId, g.GameName, i.ImageId, i.ImageSrc FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
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

        cursor.execute("select g.*, i.ImageSrc, i.ImageAlt from game g inner join image i on g.CoverImage = i.ImageId where g.GameName like \'%"+_searchTerm+"%\'")
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

                _query = "select GameName, Price, GameId from game where GameId in ("+_gameIdsString+")"
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

            print('Data = ', data)

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
                # return redirect('/')
                return json.dumps({'message': True})
            else:
                return json.dumps({'message': False})
        
        except:
            return render_template('error.html', error='Some error occurred')
    else:
        return json.dumps({'messsage': False})

@app.route('/getAllGames')
def getAllGames():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("select g.*, i.ImageSrc, i.ImageAlt, i.ImageId from game g inner join image i on g.CoverImage = i.ImageId")
        data = cursor.fetchall()

        return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

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

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
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

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
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

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
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

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
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

            _query = "SELECT g.GameId, g.GameName, g.Rating, i.ImageId, i.ImageSrc, i.ImageAlt FROM game g inner join image i on g.CoverImage = i.ImageId where g.GameId in ("+_gameIdsString+")"
            cursor.execute(_query)
            data = cursor.fetchall()
            return json.dumps(data)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run()