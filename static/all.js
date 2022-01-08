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

//게시물 붙이기 
$.ajax({
type: 'GET',
url: '/post/get',
data: {},
success: function (response) {
        let nickname = response['nickname']
        let pro_img = response['pro_img']
        let rows = response['post']
        // JS reverse()함수 사용해서 리스트로 받은 DB데이터를 역순정렬한다
        let row = rows.reverse()
        for (let i = 0; i < rows.length; i++) {
            let post_url = row[i]['post_url']
            let post_text = row[i]['post_text']
            let post_time = row[i]['post_time']
            
            let temp_html = `<div class="post-wrapper" >
            <div class="post-header">
                <div class="left-wrapper">
                    <img src="${pro_img}"/>
                    <p>${nickname}</p>
                </div>
                <div class="right-wrapper">
                    <img src="../static/img/more@3x.png">
                </div>
            </div>
            <div class="post-body">
                <img src=${post_url}>
                <div class="post-icons-wrapper">
                    <div class="left-wrapper">
                        <!-- 사진 아래 아이콘 -->
                        <img class="post-icon" src="../static/img/like@3x.png">
                        <img class="post-icon-2" src="../static/img/comment@3x.png">
                        <img class="post-icon" src="../static/img/dm@3x.png">
                    </div>
                    <div class="right-wrapper">
                        <img src="../static/img/favorite@3x.png">
                    </div>
                </div>
            </div>
            <div class="post-footer">
                <div class="post-like-wrapper">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRFRgREhISGBIYERESEhgSEhESGBERGBgZGhgUGhgcIS4nHB4rHxgZJjgmKy8xNjU1GiQ7QDszPy40NTEBDAwMEA8QHxISHzQmJSU1NDQxNDQ0MTY2MTQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NP/AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQcEBQYCAwj/xABKEAABAwICBgYGBgYHCQEAAAABAAIDBBEFEgYHITFBURNhcYGRoSIjMnKxwRRCUmKCsjOSosLR0iRDRFNjk+EVFyU0ZHOD8PEW/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EACcRAAMAAgICAQQDAAMAAAAAAAABAgMRBDESIUEiMlFhBRMUM3GR/9oADAMBAAIRAxEAPwC5kREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBFBK8teDuIPYQUB7REQBF4e8NFyQBzJsFrKrSKii/SVdO09crL+AKA2yLl5dPsLbvq2H3WyP8Ag1Y7tZOFj+veeyGb+VAdgi5FmsfCj/aSO2KYfurLh03wx+6shHvFzPzAIDo0WDS4pTzfop4n+5Ixx8AVnIAiIgCKLqUAREQBERAEREAREQBERAQuF0607Zh/qIQ19UWgnNfLC07nO5nk3x6+rxnEG0sElQ72Y43PtzIGwd5sO9UToth7sSq3STkvaHGae/13E+izsJ8m2ULtTLp/B2Vt6R9IqPFcW9Y98joybh0r+jZ+Fg3jsCym6vayP045og8bRkc+M394BWgxgaAAAABYAcByXpeXfPvf06SNa4869laQ6RY1hR9fnkhGz11pWdREjdo7yvhJphjVcfUukDNuymja1vZnIP5laLmAixAI3EHioawDYAAOAGyykv5B69r2c/zLfZVX/wCRxSrOaof/AJ8xeR+EErOptWb/AK9U0dUcRPmXD4KybIFVXOyvr0TWCUcNHq3ph7U07uzI391fcavKPi6Y/wDkH8F2ShVPl5n8k/6Z/BxrtXdGdz5h+Np+IWNLq2gPsVEzT95rHjysu7RFy8y+R/TH4KxqdWko2x1EbjwzxujPiCV8m4ZjlH+hkmLRu6KZsgA9x5+StNQrY5+Vd6ZB8eX0VvHrNxKnBjqI43SWs10sbonNP2i0WDvALXfTMaxP0g+d0Z3FrhBGB1WtceKtWanY8Wexrhyc0OHgV7DbK2v5F69L2RXG9+2VWzQjEmem2Rgfv9Gd4df3rfNZuH6X4phT2x1jZJISbZZSCcvExyi9zbbYk929WQsPEqCOpjdFI0OY4WPUeDgeBHNRx/yFeX1L0K4y16OjwfFYqyJtRA7NG4bOBB4hw4EclsFTermtfh9e/DZHEskc5rb7uka3M1495uzwVyL1k01tGRrRKIi6cCIiAIiIAiLGrqyOCN00rg2NjS57juACA5LWzOW4e9oPtywtPWA8OI/ZXLarqYCCSTi+XL3MaNni4rQY7jNVjlSIogRECeiYSQ1jOMkltmbr4XsOuxcAwhlHC2FhLrEuc529z3bz1Dq6li52RTHj8svwS29mzREXjG4lQiFAERFwBQpULh0IiIAoUlQgCIi4AiIh0rTTsmmrqapZsd6t+ziY3j5EBXiFV+nGjrq1jXxn1sefI07ntdbM3qOwWXy1a6aPDhh1YSHA5Kd775gRf1MhPHg093Je9xMirGl8o87PLVN/ktdERaykIiIAiIgIVL6zdJHVcwoKcl0bHhr8u3pqi9rdYadnbfku+1g6QfQKVxabTSXii5tJBzSfhG3tsq91b4JmJrZBexcyG/2vrv8Al4qvLkWOW2TiXVaR1Gimj7KKIA2MrwDK7meDR90X+a3wQKV4F27p0z0JlStIIiKskSoKIgCIiAKFJUXXDoRRdTdcAKhSoTYCIiAIiIdPK4PT/RvODWQts9u2UN3vaLWeLfWbbw7F3ihwvvV2DNWOk0V3CpaZi6t9K/8AaEHRyn+kxAB/+Izc2T5Hr7V2ioWsD8FxBlRED0LnZg0bnRkgSRd28dyvOlnZKxsjCCx7WvaRxa4XB819BFK5VL5POqXL0zIREUyIRFrserxTU81Qf6uF7x1uAOUeNkBTesCvdiOIimjN2McKZlt2fN6x3jcfgViUFKyGNkTBZjGNY3sA3qudXNGZah9U/bkadp4yvNy7ttf9ZWcF5PPybpSvg2cePXkelKhF55pJREXDoRFg4ti0FKzPO8NbezRvc48mtG0rsy6ekRb17ZnIuewvTGjqXiNkjmvJs0SN6POeQN7E9S6ELtRUvVLRxUq6ISylQoEyLIpULgCLxK9rAXOIDQCXEkAADeSeC5w6c4eHZOlO+2YMcWfrcutWTjuvtWyLqZ7Z0yL5Qyte0PY4OaQC0tIIcDxBX1VbWiQXlel5KHSFC9FeUQOe01wr6VTPAF3svJHzu0bW94uPBffU/jXTU76V5u+B12czA7d4OzDwW4cq70Yl/wBnYz0d7RyPdDyGSYhzPBwaF6/AybTl/HRi5M+1ReSIi9IyhcNrarejoSwHbLNHH+EXefyea7lVXrrqNlNH1yyHuDWj4lARq6pejpc9tskj3/hFmD8p8V1gWp0YiyUsDf8AAjJ7XNBPxW2C8DkPyyN/s9HGtSj0EUBelSWBSvLnAbSsd9awcz2BFDfR1S30jKVRay5JDV5XXyNij6McLOuXEd48grQbXt6/Ba7SDAKfEWDOS17b5HstmaDvBB3jZuWnjV/Ve6XorzYqc6KSBI2gkEbQRsII4q/sKe90MbpP0hijL/eLQT5rlMK1eQRPEksrpcpu1hYGNuN2axN+xdsArOZnjJpT8FWHG522SoJXzklawZnODRxLiAPErXSaQUbdjqmEH/uNPwWNY6fSL/JLs2iLWw47SPNmVMJPISM/is9rgdo2jmOKjWOp7R1Un0cjrNmeylDWXDXzMbJb7GVxDT1EgKpV+gMRoI6iN0UjczHCxG7sIPAhcQdWrM9/pL+jvu6Nua3LNe3fZejxOTjiNV6M2XFVPaMzVhM91M9rr5GTER34AtBIHVc+a7Za2hpoaSNsMQsxo2DeSTtJJ4kr6GvH2SsmZPJbqV6ZpxYqUpGcvKxWVzTvuO1ZIcDtCoqHPZNy57BUKSoXDh5cq31ixmKpgqm+1Zu378bw9p8/JWSVxGs6G8Eb/szgdzmP+YC2cOtZV+ynOtwW5RziSNkg3PjY8djmgj4rIXPaBz58PpXHeKdjD2s9H5LoV7h5wVN6533qIW8qdx/Wef5VcipnXK3+lRn/AKUfnegOyw1tomDlGwfshZYWLQH1bD/hx/lCy189k+5npx9qAUSPDRc7lKwsRfsA7SVGJ8q0WTPlWjFqKgvPVwC+S82UrapSWkbkklpErU41pFHQlmZr3PfcgMtsaLXJJ2cVtlrsWweGraBIDdt8jmmzm33/AAGxTlTv6uiGVU4fj2bLBtKKWqADJGtfxY/0HdwO/uXOaU6d9G50NJlLhcPlNi1p3EMHEjmdnauS0i0fNJlcJA9jnFrQQQ4EC+3gR1rqtWGiUdSDW1DczGvLIWO9l722u9w4gHYBzB5K7HxMXl5r2vweNlyXL8aWmc7R6PYniZEnRyPadofO4MZ2tzfuhb6LVPWEelPTtPK0j7eQVyNaBsA2cOpStiSXpGZvZS1TqprGj0Jad55Xey/iFopaXE8JcCWyRNzbCLPieeWy7dvcV+hV8ainZI1zJGNcxwLXNcA4OB4EFcaVLTR1NrorfRTTFlWRDKAye2y3syW+zyP3Vn45pNTUoyvkbn+y303DuG7vXDawNGBh0zXw3EEl3R7TeKQG5ZfluIPbyWDgmjD6poldI1sZJ3ek8kGx2bh3rFfDxTXm3pfg14st19MrbO0wXHo6zPkDw5tsweBexvY7OwraLW4Pg8VI0iMG7rZ3ONy627sG0rYqivHf09Hr4vLxXl2F96eoLD1cQvgoUXKa0ydJNaZvGuuLqVi0D7ttyNlkrFU+L0YaWnogrlNYjb0buqSI/tW+a6orl9YH/Jv9+L84VvG/5V/2U5fsZ1Gq2TNhsPU6Vvg9y69cbqpH/Do/fm/OV2S+gPNCqTXRD6ynfwMcjO8OB+attVzrkpc1PDKB7E5afdew/NoQGZgUuemhfzhiP7AWwC53QepElJHzZmjP4Ts8iF0QXgZ51bX7PRh7lHpYOIjce0LOC+VTFnbbjw7VCH41sux141s010upe2xsV5K2m9M9Lw97WjM4gAbySAAOsqVz+luEzVTGCIj0XOLmOdlD72se7b4qUpN6fohkqpluVtmh02xSGfIyKQPcxzi4tHo2I4O47lYmqfEGSUIiBHSRSPa8cbOdna63Ih1u0FchhOr0ObmqJDcg5WxgWBtvJO/yWhmo6/CJekjc9ltgkjGZkjL7nDdw3H/Va8WXH9ifR4mZXVeVLs/Qt1qMf0ipqBgfUPIzGzGtGd7zxs3iBzVSf70MRy5fUZvtdGb+Gay5+R1XiDzLLI97jvfJuaPstG4DqC0PS7KZl09I/QmFYrDVxtmgeHxu3EbCCN7XDeCOSzbr844bilZhryYnuZf2gRnZJbmDsPbvW9n1oYg5uUdAw2tmbGSe7M4jyT0caaemb7XNXMIgpwQZA58zgN7WWLG35XN/1VotEccp2RCCR+R4c83fsacxuLO/isDB8Aq8Sl6acyZHODpJJL5nj7LAeruHkttjmgGW8lK824sk227H/wAVmy5cTfg2aMH9kPySOqa8EXBBB3EbQUWg0Sw6amjc2Yja8FjQ7NkFtu3dt5dS311jpJPSez28dOpTa0ySi83XuKMvNh/8UW9Em9GwoB6N+ZWUvDGBoAHAKbrFT3TZit7ewVyWsV9qW32pox8T8l1ZXCazZ/Qij5yOkPY1tv3lfxZ3lRnzvUMsHVnHlw2DrEj/ANZ7iusWo0VpOgo6eI7200Qd72UF3mStuvdPOC5zT2gNRQTsAu5rOlaObozm+AK6NeHtBBB2gggjmCgKY1Z1o9bT34iVvk11vBviu/uqsrInYRiZadkYkJH3qaQmx7h5sVoRvBAINwRcW4jmvJ5seN+X5NuCtzr8H0U3UBFhLz5T07X9vNYT6J43WPktkl1ZOSpLJyVPRqxRv5DxCyIaIN2uNzy4LMuoKVlp+iVZqfohHAHeiKsqOL0/wJskHTQxtEkbsz8jQC6Mj0t2+2w9xXD4Ti7Y29HJctG1hG21+CuorlcR0Go5nF7Q+Mk3IjcMpPPKQQO5b8HKSnxspqHNeUdlb11U+rkayNpNzkjbxc4/++StrAsDipomMMcZkawZ35Gkl52uN9+9fLBNGKWjOeNhL7WzvOZwHIcG9y3ir5PJ8tTHpI7EPbqvbZKgpdRdYi4xZaIHa3YfJfA0T+rxWxul1NZaRbOWkYDKE/WI7tqy44wwWA/1Xu6hRq6rs5V1XZJKgqEK4QIJVeY4w12KQ0rdrWvijd1DNnkP6vwXc4pWsp4nzP8AZYwu7TwaOsnZ3rnNUWHOnqJsRk25c7Gk8ZpCHOPc3Z+NejwMft0zJya9KS32iwsNwFgvSIvVMYREQFf609HTVQCqjbeWAEuAFy+DaXDrIO3xWh0AxwSx/Rnn1kbfQudr4uB6yN3grbIvsO5Uppxo5LhdQKyluIHPzMI3RPO+M/dO23VsVWbEsk6/8J47cvZYYRabR3Ho6yMPabSCwkZxY75g8CtyCvDuHFeNHoTSpbRKFQhUCRCFEKAhRdSVC4CC5fCKrjffI9jrGxyPa6x5Gx2JXQdIx8eYtzsezMN7cwtcKqajQyvhdaNoeNwdFJluOsGxC04cUWn5PTKrqp6Wy1vpUebJnZntfLnbmtzy719rqtNGtEKts7Kia0YY8PPp5nvI4bNw53O5WSFDPjiXqXs7FVS21olQiKksClQFK4dIQqVCHSFBKErkNMtKBTtMELrzuFiRt6IHj7x4DvVmLHWStIhdqVtmq0yxJ9XOzD6YF5zta7LtzynYG7ODd5/0Vv6M4MygpmUzbEtbd7vtyHa53j5ALkdWOhppW/Talp+kyD0Gu2mGM/WN9ud3HkNnNWMvexwolJHm1Tp7ZKIisIhERAFjVtJHOx0UrGujc0tc1wuCFkogKP0m0UqcIk+l0jnupwb5t5jB+pIPrN6/gVvtHNLYasBjyGT8WOOx55sPHs3qznsBBBAIIsQdoI7FWulmrBkpM1CWsftcYnE5HH7jvqHq3diozYJyr33+ScZHL9HRBym6q2DSPEMNf0FXG9wGwNl9F4b914vmHj2rrcL0yo57DpMjzb0ZPR28g7cfFeXl4mSPja/RtnNNfo6VQV8mSgi4II4W23XrMsxYSVC85kuuHSSoshKi6AIouougPSheS5MyHT2puvnmXxnqmRjM9zWtG8uIA81xJv0jnRkkr5vkDQSSABtJOwALjsY06gjuIj0jhf2Nje0vI3dgK1tHhmK42RsMdKduZ4yRgcwPakPl2LZi4V17r0ims8z17MrSHTMk/R6K75HHJnaC6zj9Vg+sevd2rotAtXxhIrK8Zqi+eOMnOInbfTcfrP6uHauj0V0KpcNGZjc85FnSv9rrDG7mDs7yV1K9XFhnGtSY7t09sKURWkAiIgCIiAIiIAiIgMOvw+GoaY5o2PYfqvaHDuvuK4XGNU9JJd1PJJC43OU+tZfscbgd6sZEBSMmr7GKMk0srXt5RymO/wCB+zzWO7F8bpdk9K9wG8vgf+dmxXopVdY4rtIkrpdMoqLWKWnLLTEHiGyWPg4LPh1hUx9qOZv4WO+DlblTh0EuySGJ/vxsd8QtRPoXhj9rqGnvzbGGflsqa4mJ/BNZqXycG3TuiP15B2xvX0GmtD/en/Lf/BdXJq5wp39lt7ssrfg5fA6r8K/uZP8APm/mUP8ADj/ZL++jmjprQ/3p7o3/AMF8X6d0Y3PkPZG/5rq26sMKH9S89s838yyotXeFN/sbD775H/Fyf4cX7H+iiv59YVM32Y5ndzGDzcsI6eyy7Kekc49RdIfBgVt02iWGxG8dFSg8+hY4+YK3EMDGCzGNaOTWho8lNcTEvgi81P5KSYNIKvZHTPjaeORsQA96Q38Fm0mquuqHB9bVsbt2hpfO/uJs1vmrlUK6ccT0tEHbfbOSwLV5h1IQ4RGWQW9Oc57EcQ32R4LrQLbAvSKwiEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH/9k=">
                    <p><strong>댓글입력한 사람</strong>님 <strong>외 6,671명</strong>이 좋아합니다</p>
                </div>
                <!-- 게시글 텍스트 달리는 구간 -->
                <div class="post-test">
                    <p class="post-author">${nickname}</p>
                    <p class="post-content">${post_text}</p>
                </div>
                <!-- 댓글 달리는 구간 -->
                <div id="comment-box"></div>
                <p class="post-time">
                    ${post_time}
                </p>
                <!-- 댓글 입력 -->
                <div class="comment-input-box">
                    <img class="post-icon-2" src="../static/img/comment@3x.png">
                    <input type="text" id="comment" placeholder="댓글 달기...">
                    <div class="input-btn">
                    <label class="comment-btn" onclick="save_comment()">게시</label>
                    </div>
                </div>
            </div>
        </div>
            `
            $('#post-container').append(temp_html)
        }
    }
}); 


//페이지 이동
function to_post() {
    window.location.href = "/post"
}

function to_home() {
    window.location.href = "/home"
}