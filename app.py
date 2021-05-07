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


@app.route('/validateLogin', methods=['POST'])
def validateLogin():
    try:
        _usernameOrEmail = request.form['usernameOrEmailAddress']
        _password = request.form['password']

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user WHERE username = %s or emailId = %s", (_usernameOrEmail, _usernameOrEmail))
        data = cursor.fetchall()

        print('data = ', data[0][3])

        if len(data) > 0:
            if data[0][3] == _password:
                session['user'] = data[0][0]
                return redirect('/')
            else:
                return render_template('error.html',error = 'Wrong Email address or Password.')
        else:
            return render_template('error.html',error = 'Wrong Email address or Password.')

    except Exception as e:
        return render_template('error.html',error = str(e))
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
    
    print('lastName', _lastName)
    # validate the received values
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO user VALUES (%s, %s, %s, %s, %s, %s, %s)", ( _username, _firstName, _lastName, _password, _dateOfBirth, _emailId, _gender))
    
    data = cursor.fetchall()

    if len(data) == 0:
        conn.commit()
        return redirect('/')
        # return json.dumps({'message':'User created successfully!'})
    else:
        return json.dumps({'error':str(data[0])})


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
            print("Images = ", images)

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

        print('username = ', _username)

        con = mysql.connect()
        cursor = con.cursor()

        cursor.execute("SELECT * FROM user WHERE Username = %s", (_username))
        data = cursor.fetchall()
        print('data = ', data)

        return json.dumps({'response': data})

    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()

if __name__ == "__main__":
    app.run()