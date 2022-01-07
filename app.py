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

SECRET_KEY = 'AHLONG'

@app.route('/home')
def home():
    return render_template('index.html')


#============================회원가입 // 로그인==================================
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
        # 해킹을 방하기 위해 해시함수로 password 암호화 해서 저장.
        pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

        # 예외처리) 어떤형식을 유지해야 하는가?
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
            'nickname' : nickname_receive,
            'post' : []
        }
        db.userinfo.insert_one(doc)
        return jsonify({'result': 'success','msg': '회원가입 완료!'})



# 로그인 하기(페이지 처음 화면)
@app.route('/' ,methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        email = request.form['email_give']
        password = request.form['password_give']

        # 로그인 창에 입력받은 password를 똑같이 해쉬함수로 암호화해서 DB 데이터와 확인
        pw_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

        find_info = db.userinfo.find_one({'email': email, 'pw_hash': pw_hash})
        
        if find_info is not None:
            # 클라이언트 측에서 로그인 관리하도록 쿠키 구워주자.
            # jwt 헤더.시크릿키.해쉬알고리즘
            payload = {'id': email, #해킹당해도 위험 부담이 적은 유니크한 값으로 사용자 정보를 받고 / 토큰 유효시간 정해주기
                'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60*300)}
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return jsonify({'result': 'success' , 'msg': '로그인 완료!' , 'token': token})
        else:
            return jsonify({'result': 'False' , 'msg': '로그인 실패'})
            


#============================ 게시물 올리기 ====================================
#게시물 DB 저장
@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == 'GET':
        return render_template("post.html")
    else:
        post_url = request.form['post_url']
        post_text = request.form['post_text']
        dt_now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        doc = {
                'post_url': post_url,
                'post_text' : post_text,
                'post_time' : dt_now
                #'post_coment' : [] 선생님이 지혜를 쓸까..
            }
        db.post.insert_one(doc)
        return jsonify({'result': 'success','msg': '업로드 완료!'})

# 게시물 home에 붙이기
@app.route("/post/get", methods=["GET"])
def post_get():
    # 사용자 정보는 우째 가져오나.. 토큰으로 가져오나? 어떻게...?
    post_list = list(db.post.find({}, {'_id': False}))
    return jsonify({'post': post_list})




if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)