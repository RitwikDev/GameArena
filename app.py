from flask import Flask, render_template, request, json, redirect
from flaskext.mysql import MySQL
from flask import session

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

@app.route("/")
def main():
    # return render_template('index.html')
    if session.get('user'):
        return render_template('userHome.html')
    else:
        return render_template('index.html')

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
        return render_template('userHome.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')

@app.route('/validateLogin', methods=['POST'])
def validateLogin():
    try:
        _usernameOrEmail = request.form['usernameOrEmailAddress']
        _password = request.form['password']

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user WHERE username = %s or emailId = %s", (_usernameOrEmail, _usernameOrEmail))
        data = cursor.fetchall()

        if len(data) > 0:
            if data[0][3] == _password:
                session['user'] = data[0][0]
                # return redirect('/')
                return json.dumps({'message': data})
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
    
    # validate the received values
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO user VALUES (%s, %s, %s, %s, %s, %s, %s)", ( _username, _firstName, _lastName, _password, _dateOfBirth, _emailId, _gender))
    
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
        featuredGameIds = cursor.fetchall()

        if len(featuredGameIds) > 0:
            cursor.execute("SELECT * FROM image where GameId in %s", (featuredGameIds))
            images = cursor.fetchall()
            return json.dumps(images)
        
    except Exception as e:
        return render_template('error.html', error = str(e))
    
    finally:
        cursor.close()
        conn.close()

@app.route('/deleteTodo',methods=['POST'])
def deleteTodo():
 
    # read the posted values from the UI
    _todoID = int(request.get_data())
 
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM tbl_todo WHERE id = %s", (_todoID))
    data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        return json.dumps({'message':'todo deleted successfully!'})
    else:
        return json.dumps({'error':str(data[0])})

@app.route('/updateTodo',methods=['POST'])
def updateTodo():
 
    # read the posted values from the UI
    _id = request.form['modalTodoID']
    _title = request.form['newTitle']
    _description = request.form['newDescription']
 
    # validate the received values
    if _title and _description:

        conn = mysql.connect()
        cursor = conn.cursor()

        cursor.execute("UPDATE tbl_todo SET title = (%s), description = (%s) WHERE id = (%s)", (_title, _description, _id))
        data = cursor.fetchall()

        if len(data) == 0:
            conn.commit()
            return json.dumps({'message':'todo updated successfully!'})
        else:
            return json.dumps({'error':str(data[0])})


    else:
        return json.dumps({'html':'<span>Enter the required fields!</span>'})

@app.route('/completeTodo',methods=['POST'])
def completeTodo():
 
    # read the posted values from the UI
    _id = request.form['modalTodoID']
 
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("UPDATE tbl_todo SET isComplete = (%s) WHERE id = (%s)", (1, _id))
    data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        return json.dumps({'message':'todo completed!'})
    else:
        return json.dumps({'error':str(data[0])})


@app.route('/checkUsername', methods=['POST'])
def checkUsername():
    try:
        _username = request.get_data()
        _username = _username.decode("utf-8")

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user WHERE Username = %s", (_username))
        data = cursor.fetchall()

        return json.dumps({'response': data})

    except Exception as e:
        return render_template('error.html',error = str(e))
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
    return render_template('search.html', searchTerm = str(_searchTerm))

@app.route('/showDetails')
def showDetails():
    _gameId = request.args.get('gameId')
    return render_template('details.html', gameId = str(_gameId))

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
        return render_template('index.html')

@app.route('/getCartContents')
def getCartContents():    
    try:
        if session.get('user'):
            _userId = session.get('user')
            
            conn = mysql.connect()
            cursor = conn.cursor()

            cursor.execute("select GameId from cart where UserId = %s", (_userId))
            data = cursor.fetchall()
            print('data = ', data)

            if len(data) > 0:
                _gameIds = list(sum(data, ()))
                _gameIdsString = '\',\''.join(_gameIds)
                _gameIdsString = '\''+_gameIdsString+'\''

                _query = "select GameName, Price from game where GameId in ("+_gameIdsString+")"
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

if __name__ == "__main__":
    app.run()