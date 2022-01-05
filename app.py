from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
import certifi
import re
import jwt
import datetime
import hashlib
                                                                                                                    
client = MongoClient('mongodb+srv://test:sparta@cluster0.u0c0t.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=certifi.where())         
db = client.dblogintest

app = Flask(__name__)

SECRET_KEY = 'SPARTA'

@app.route('/home')
def home():
    return render_template('index.html')


# 회원가입을 해준다.
@app.route('/join', methods=['GET', 'POST'])
def join():
    if request.method == 'GET':
        return render_template('join.html')
    else:
        email_receive = request.form['email_give']
        password_receive = request.form['password_give']
        name_receive = request.form['name_give']
        nickname_receive = request.form['nickname_give']

        pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

        # 이메일은 어떤형식을 유지해야 하는가?
            # 중복확인, '@' '.' 이 있는지, 영문과 숫자 확인.
        # 비밀번호 어떤형식에 부합해야 하는가?
            # 숫자, 영문, 특수문자로 이루어진 8자리 이상
        # 이름은 한글로만 (외국인은...)
            # 한글 확인 / 길이 > 1 확인
        # 닉네임은 어떤 형식에 부합해야 하는가?
            # 영문, 숫자만 가능하게   

        # 위의 확인 작업에서 True를 반환하면 DB에 저장하도록한다.
        # False를 반환하면 "에러"문이 뜨게 한다.

        # # email 유효성 확인
        # find_email = db.userinfo.find_one({'email':email_receive})
        # if find_email is not None:
        #     if re.match('^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,5}$', email_receive) is not None:
        #         return True

        # # password 유효성 확인
        # if re.match('^([a-z]+)([A-Z]*)([0-9]+)[a-z0-9\d$@$!%*#?&]{8,}$', password_receive) is not None:
        #     return True
        
        # # name 유효성 확인
        # if re.match('^[가-힣]{2,}$', name_receive) is not None:
        #     return True

        # # nickname 유효성 확인
        # if re.match('^([a-zA-Z]+)[a-zA-Z0-9]{3,}$', nickname_receive) is not None:
        #     return True


        doc = {
            'email': email_receive,
            'pw_hash' : pw_hash,
            'name' : name_receive,
            'nickname' : nickname_receive
        }
        db.userinfo.insert_one(doc)
        return jsonify({'result': 'success','msg': '회원가입 완료!'})



# 로그인 하기 (페이지 처음 화면)
@app.route('/' ,methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        # DB에 저장된 이메일과 비밀번호와 동일한가?
        email = request.form['email_give']
        password = request.form['password_give']

        pw_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

        find_info = db.userinfo.find_one({'email': email, 'pw_hash': pw_hash})
        if find_info is not None:
            payload = {
            'id': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60*350)
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return jsonify({'result': 'success' , 'msg': '로그인 완료!' , 'token': token})
        else:
            return jsonify({'result': 'False' , 'msg': '로그인 실패'})
            



        


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)