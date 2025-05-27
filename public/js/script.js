var owner;var chatP=document.getElementsByClassName('chat__page')[0],accountP=document.getElementsByClassName('account__page')[0],loadingP=document.getElementsByClassName('loading__page')[0],accountData = localStorage.getItem('account__data');
owner = JSON.parse(accountData) || 'not Owned!';var username=document.getElementsByClassName('username')[0],password=document.getElementsByClassName('password')[0];var sbtn = document.getElementsByClassName('submitBtn')[0];
var tcover = document.getElementsByClassName('transparent__cover')[0];
var ppp = document.getElementsByClassName('tyyu')[0];var send__btn=document.getElementsByClassName('o__setting')[0];var chat__in=document.getElementsByClassName('chat__in')[0];var display__c=document.getElementsByClassName('mid__chat')[0];var greet__txt=document.getElementsByClassName('greet_txt')[0];var show_f__btn=document.getElementsByClassName('show_friendlist')[0];var console__page=document.getElementsByClassName('console__page');var white__Wrap=document.getElementsByClassName('whiite-wrap')[0];var logOutbtn=document.getElementsByClassName('logotu__btn')[0];var btn__Wrap=document.getElementsByClassName('setting')[0];
window.addEventListener('load', ()=>{
    if(!window.localStorage) {
        alert('something went wrong!')
    } else {
        if(accountData === null) {
            loadingP.style.display = 'none';
            accountP.style.display = 'block';
        } else {
            loadingP.style.display = 'none';
            chatP.style.display = 'block';
        }
    }
})
function crescript() {
    var g = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    g.appendChild(script);
    script.className = 'scirpt_chat';
    script.type = 'text/javascript';
    script.src = '/js/chatscript.js';
}
function disableForm(k,l) {
    tcover.style.display = k;
    ppp.style.opacity = l;
}
async function accountManage() {
    disableForm('block', '0.5');
    if(username.value.length > 20 || username.value === '') {
        alert('username must be less than 20 character');
        disableForm('none', '1');
    } else if (password.value === '' ) {
        alert('write password');
        disableForm('none', '1');
    } else {
        disableForm('block', '0.5');
        var data = {username: username.value, password: password.value};
        var xml = await new XMLHttpRequest();
        xml.open('POST','/accounts');
        xml.setRequestHeader('Content-Type', 'application/json')
        xml.send(JSON.stringify(data));
        var xmlb = await new XMLHttpRequest();
        xmlb.open('GET', '/getaccountdata');
        xmlb.send();
        xmlb.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var adata = JSON.parse(this.responseText);
                if(adata.isAccount === true) {
                    var fg = new XMLHttpRequest();
                    fg.open('GET', `/account/${data.username}/password.txt`);
                    fg.send();
                    fg.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200) {
                            if(password.value === this.responseText) {
                               localStorage.setItem('account__data', JSON.stringify(data));
                               accountP.style.display = 'none';
                               chatP.style.display = 'block';
                               accountData = localStorage.getItem('account__data');
                               owner = JSON.parse(accountData) || 'not Owned!';
                               crescript();
                            } else {
                                disableForm('none', '1');
                                alert('password is incorrect');
                            }
                        } 
                    }
                } else {
                    var ne = new XMLHttpRequest();
                    ne.open('POST', '/createaccount');
                    ne.send(JSON.stringify({create:true}));
                    localStorage.setItem('account__data', JSON.stringify(data))
                    accountP.style.display = 'none';
                    chatP.style.display = 'block';
                    disableForm('none', '1');
                    accountData = localStorage.getItem('account__data');
                    owner = JSON.parse(accountData) || 'not Owned!';
                    crescript();
                }
            }
        }
    }
    
}
sbtn.onclick = function() {
    accountManage()
}
// show_f__btn.onclick = function() {
//     if(console__page[0].style.display === 'block') {
//         console__page[0].style.display = 'none';
//         console__page[1].style.display = 'block'
//     } else {
//         console__page[0].style.display = 'block';
//         console__page[1].style.display = 'none'
//     }
// }
white__Wrap.onclick = function() {
    btn__Wrap.style.display = 'none';
    white__Wrap.style.display = 'none';
    editModal.style.display = 'none';
    delModal.style.display = 'none';
}
document.getElementsByClassName('o__setting')[0].onclick = function() {
    btn__Wrap.style.display = 'block';
    white__Wrap.style.display = 'block';
}
logOutbtn.onclick = function() {
    localStorage.removeItem('account__data');
   location.reload();
}