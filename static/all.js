// 회원가입
function join(){
let email = $('#input_email').val()
let password = $('#input_password').val()
let name = $('#input_name').val()
let nickname = $('#input_nickname').val()
    // 값(정보)을 받아 보내준다.
    $.ajax({
        url: "/join",
        data: { 
            email_give:email, name_give:name, nickname_give:nickname ,password_give:password
        },
        method: 'POST',
        dataType: 'json',
        success: function (response){
            if (response['result']=='success') {
                alert(response['msg'])
                location.replace('/')
            }
            else {
                alert('회원가입 오류 !')
                window.console.log("회원가입 실패")
            }
        }
    });
}


//로그인
function login(){
    // 변수 email, password에 input 값을 저장한다.
let email = $('#input_email').val()
let password = $('#input_password').val()
    // "/"주소에 POST 방식, json형식으로 data를 보낸다.
    $.ajax({
        url: "/",
        data: { email_give:email,
            password_give:password
        },
        method: 'POST',
        dataType: 'json',
        success: function (response){
            if (response['result']=='success'){
                alert(response['msg'])
                window.console.log("로그인 완료")
                //쿠키 저장할 때, '/'안에 저장해야 다른 페이지에서도 사용가능.
                //쿠키 저장하기 $.cookie(‘저장할이름’, token의 값, 저장위치)
                $.cookie('99token', response['token'],{path:'/'})
                window.location.replace('/home')
            }
            else if (response['result']=='False'){
                alert(response['msg'])
                console.log("로그인 실패")
            }
       
        }
    });
};


//게시물 저장
function post(){
    let post_url = $('#post-url').val()
    let post_text = $('#post-text').val()
    $.ajax({
        url: "/post",
        data: { post_url:post_url,post_text:post_text},
        method: 'POST',
        dataType: 'json',
        success: function (response){
            if (response['result']=='success'){
                alert(response['msg'])
                window.console.log("완료")
                window.location.replace('/home')
            }
            else {
                alert("업로드 실패 !")
                console.log("실패")
            }
        }
    });
};


//게시물 삭제
function post_del(a) {
    let postID = a
    $.ajax({
        url: '/post/delate',
        data: {postID:postID},
        method: 'POST',
        dataType: 'json',
        success: function(response){
            if (response['result']=='success'){
                alert(response['msg'])
                window.console.log("완료")
            }
            else {
                alert("작성자만 삭제 가능합니다.")
                console.log("실패")
            }
        }
    })
 }


//POST 댓글 저장
function save_comment(a){
    let comment = $('#comment').val()
    let postID = a
    $.ajax({
        url: "/post/comment",
        data: {comment:comment,postID:postID},
        method: 'POST',
        dataType: 'json',
        success:function(response){
            if (response['result']=='success'){
                alert(response['msg'])
                window.console.log("완료")
            }
            else {
                window.console.log("실패")
            }
        }
    })
}

//페이지 이동
function to_post() {
    window.location.href = "/post"
}

function to_home() {
    window.location.href = "/home"
}