'use strict';
var sel = [];
var navA = document.getElementsByClassName('action__bottom_nav')[0];
var stxt = document.getElementsByClassName('ooo')[0];
var SclsBtn = document.getElementsByClassName('close__select')[0];
var editBtn = document.getElementsByClassName('edit___btn')[0];
function selectable() {
    var oBlock = document.getElementsByClassName('ownerc');
    if(sel.length > 0) {
        for(var g=0; g < oBlock.length; g++) {
            oBlock[g].onclick = function() {
               
                if(this.parentElement.dataset.select === 'false') {
                    sel.push(this.parentElement.dataset.index);
                    this.parentElement.dataset.select = 'true';
                    this.parentElement.style.background = 'rgba(121, 85, 72, 0.2)';
                    navA.style.display = 'block';
                    stxt.innerHTML = sel.length + ' ' + 'Selected';
                    if(sel.length < 2) {
                        editBtn.style.display = 'inline-block';
                        //alert(sel.length)
                    } else {
                        editBtn.style.display = 'none';
                        //alert(sel.length)
                    }
                } else {
                    if(sel.length === 1) {
                        navA.style.display = 'none';
                        editBtn.style.display = 'none';
                        for(var g=0; g < oBlock.length; g++) {
                            oBlock[g].onclick = '';
                            stxt.innerHTML = sel.length + ' ' + 'Selected';
                         }
                    }
                    var g = sel.indexOf(this.parentElement.dataset.index);
                    sel.splice(g, 1);
                    this.parentElement.dataset.select = 'false';
                    this.parentElement.style.background = 'none';
                    stxt.innerHTML = sel.length + ' ' + 'Selected';
                    if(sel.length < 2) {
                        editBtn.style.display = 'inline-block';
                        //alert(sel.length)
                    } else {
                        editBtn.style.display = 'none';
                        //alert(sel.length)
                    }
                }
            };
        }
    }
}
function del() {
    var oBlock = document.getElementsByClassName('ownerc');
    for(var i=0; i< oBlock.length; i++) {
     oBlock[i].oncontextmenu = function(event){
        event.preventDefault();
        editBtn.style.display = 'inline-block';
        //  var par = this.parentElement;
        //  par.style.background = 'rgba(121, 85, 72, 0.2)';
        if(this.parentElement.dataset.select === 'false') {
            var t = document.getElementsByClassName(this.parentElement.className);
            for(var p=0; p< t.length; p++) {
                t[p].dataset.select = 'false';
                t[p].style.background = 'none';
            }
            sel = [];
            sel.push(this.parentElement.dataset.index);
            this.parentElement.dataset.select = 'true';
            this.parentElement.style.background = 'rgba(121, 85, 72, 0.2)';
            navA.style.display = 'block';
            stxt.innerHTML = sel.length + ' ' + 'Selected';
            selectable();
           } else {
            if(sel.length === 1) {
                navA.style.display = 'none';
                // var po = sel.indexOf(this.parentElement.dataset.index);
                // sel.splice(po, 1);
                sel = [];
                stxt.innerHTML = sel.length + ' ' + 'Selected';
                this.parentElement.dataset.select = 'false';
                this.parentElement.style.background = 'none';
             
                for(var g=0; g < oBlock.length; g++) {
                 oBlock[g].onclick = '';
                 stxt.innerHTML = sel.length + ' ' + 'Selected';
              }
            } else if(sel.length > 1) {
               sel = [];
               for(var m=0; m < oBlock.length; m++) {
                   oBlock[m].parentElement.style.background = 'none';
                   oBlock[m].parentElement.dataset.select = 'false';
               }
               sel.push(this.parentElement.dataset.index);
               this.parentElement.dataset.select = 'true';
               this.parentElement.style.background = 'rgba(121, 85, 72, 0.2)';
               stxt.innerHTML = sel.length + ' ' + 'Selected';

            } else {
                return null;
            }
              
           }
        };
     }

 }
del();
function clsExec() {
    SclsBtn.onclick = function() {
        var Block = document.getElementsByClassName('ownerc');
        for(var f=0; f < Block.length; f++) {
            Block[f].parentElement.style.background = 'none';
            Block[f].parentElement.dataset.select = 'false';
            sel = [];
        }
        var oBlock = document.getElementsByClassName('ownerc');
        for(var g=0; g < oBlock.length; g++) {
            oBlock[g].onclick = '';
            stxt.innerHTML = sel.length + ' ' + 'Selected';
         }
         navA.style.display = 'none';
     };
 }
 function disHeight() {
    var c = document.getElementsByClassName('con');
    for(var o=0; o < c.length; o++) {
        c[o].style.height = c[o].children[0].offsetHeight + 'px';
    }
 }

var socket;
function sockt() {
    socket = new WebSocket('ws://localhost:7000');
    socket.onopen = function() {
        var mes = JSON.stringify({type: 'inform', client: owner.username});
        socket.send(mes);
        // var g = new XMLHttpRequest();
        // g.open('POST', '/connectClient');
        // g.setRequestHeader('Content-Type', 'application/json');
        // g.send(JSON.stringify({username: owner.username}));
    };
   
    socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
       if(data.type === 'inform') {
            var data = JSON.parse(e.data);
            var isOwner = data.client === owner.username? true : false;
            var className = data.client === owner.username ? "connect__greet owner" : "connect__greet";
            var index = document.getElementsByClassName('connect__greet').length;
            console__page[0].innerHTML += `<p class="${className}" data-owner="${isOwner}" data-index="${index}">${data.client} is connected</p>`;
       } else if(data.type === 'chat'){
           var className = data.detail.username === owner.username ? 'ownerc chat__block' : 'chat__block';
           var parElem = document.getElementsByClassName('chat_side')[0];
           var elem = document.createElement('div');
           parElem.appendChild(elem);
           elem.className = 'con';
           elem.dataset.index = document.getElementsByClassName('con').length - 1;
           elem.dataset.select = 'false';
           elem.innerHTML = `<div class="${className}"><p class="username">${data.detail.username}</p><p class="chat">${data.chat.text}</p></div>`;
           parElem.insertBefore(elem, parElem.childNodes[0]);
           del();
           clsExec();
           disHeight();
           editChat();
       
       } else if(data.type === 'isTyping') {
           var parent = document.getElementsByClassName('typing__log')[0];
           parent.innerHTML = '';
           var elem = document.createElement('span');
           parent.appendChild(elem);
           elem.innerHTML = `${data.client} is typing`;
           if(elem.offsetHeight > 30) {
               elem.style.fontSize = '10px';
           } else {
           }
           setTimeout(function() {
               elem.parentNode.removeChild(elem);
               parent.innerHTML = '<span>connected</span>';
           }, 5000);
           //setTimeout(function() {document.getElementsByClassName('typing__log')[0].innerHTML = ''}, 5000);
       } else if(data.type === 'editChat') {
           var com = document.getElementsByClassName('con');
           var indx = (com.length - data.index) - 1;
           com[indx].children[0].children[1].innerHTML = data.text;
           
       } else if(data.type === 'deletechat'){
           var selectData = data.index;
           for(var f of selectData) {
               var pa = document.getElementsByClassName('con');
               pa[(pa.length - f) - 1].style.display = 'none';
           }
       }
    };
    socket.onclose = function() {
        // var t = new XMLHttpRequest();
        // t.open('POST', '/disconnectClient');
        // t.send(JSON.stringify({username: owner.username}));
        sockt();
    };
}
sockt();

greet__txt.innerHTML = `Hello  ${owner.username}`;

var xhttp = new XMLHttpRequest();
xhttp.open('GET', '/chatdata');
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        if(this.response === '[]') {
            document.getElementById('lo').style.display = 'none';
            return null;
        } else {
        var data = JSON.parse(this.responseText);
        var x=0;
        console.log(data.length);
        while(x < data.length) {
            var index = (data.length - 1) - x;
            document.getElementsByClassName('chat_side')[0].innerHTML += `<div class="con" data-index="${index}" data-select="false"><div class="${data[index].detail.username === owner.username ? 'ownerc chat__block' : 'chat__block'}"><p class="username">${data[index].detail.username}</p><p class="chat">${data[index].chat.text}</p></div></div>`;
            x++;
            del();
            clsExec();
            disHeight();
            editChat();
        }
        document.getElementById('lo').style.display = 'none';
    }
}
};

var xkl = new XMLHttpRequest();
xkl.open('GET', '/accountsList');
xkl.send();
xkl.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var gta = JSON.parse(this.responseText);
        document.getElementsByClassName('ccl')[0].innerHTML = `Member (${gta.length})`;
        console__page[1].innerHTML = gta.map((o) => {
            return `<div class="a_member">${o}</div>`;
        }).join('');
    }
};
chat__in.onkeypress = function(e) {
    var keycode = e.keycode || e.which;
    socket.send(JSON.stringify({type: 'isTyping', client: owner.username}));
    var chat__data = {
        type: 'chat',
        detail: {
            username:owner.username,
            time: {
                year: time.measuredData.GET_FULL_YEAR,
                month: time.measuredData.GET_MONTH,
                day:time.measuredData.GET_DAY,
                hour: time.measuredData.GET_HOURS,
                min: time.measuredData.GET_MINUTES,
                sec: time.measuredData.GET_SECONDS
            }
        },
        chat: {
            text: chat__in.value,
            length: chat__in.value.length
        }
    };
    if(keycode == 13) {
        if(chat__in.value < 1) {
            alert('write something ...');
        } else {
            if(socket.readyState === socket.OPEN) {
                socket.send(JSON.stringify(chat__data));
            } else {
               // sockt();
               socket.send(JSON.stringify(chat__data));
            }
            var top = new XMLHttpRequest();
            top.open('POST', '/saveChat');
            top.setRequestHeader('Content-Type', 'application/json');
            top.send(JSON.stringify(chat__data));
            chat__in.value = "";
        }
    }
   
 };
var expandBtn = document.getElementsByClassName('memberdisplay')[0];
var mSide = document.getElementsByClassName('console_side')[0];
var CSide = document.getElementsByClassName('chat_side')[0];
expandBtn.onclick = function() {
    document.getElementsByClassName('whiite-wrap')[0].click();
    CSide.style.width = '1066px';
    CSide.style.left = '300px';
    mSide.style.marginLeft = '0';
    
};
var ttBtn = document.getElementsByClassName('show_friendlist')[0];
ttBtn.onclick = function() {
    mSide.style.marginLeft = '-300px';
    CSide.style.width = '100%';
    CSide.style.left = '0';
};
var btnDel = document.getElementsByClassName('del__btn')[0];
var delModal = document.getElementsByClassName('deleteSurity__modal')[0];
var wrap__Del = document.getElementsByClassName('whiite-wrap')[0];
var canDel = document.getElementsByClassName('canchat')[0];
var editModal = document.getElementsByClassName('edit_modal')[0];
btnDel.onclick = function() {
    delModal.children[0].innerHTML = ` Delete (${sel.length}) Chat ?`;
    wrap__Del.style.display = 'block';
    delModal.style.display = 'block';
};
canDel.onclick = function() {
    wrap__Del.style.display = 'none';
    delModal.style.display = 'none';
};
var editIn = document.getElementsByClassName('edit__in')[0];
editBtn.onclick = function() {
    editIn.value = document.getElementsByClassName('con')[(document.getElementsByClassName('con').length - sel[0]) - 1].children[0].children[1].innerHTML;
    wrap__Del.style.display = 'block';
    editModal.style.display = 'block';
};
document.getElementsByClassName('cccl__btn')[0].onclick = function() {
    wrap__Del.click();
};
function editChat() {
    var editBtn = document.getElementsByClassName('edit__btn')[0];
    var chat = document.getElementsByClassName('ownerc');
    var editIn = document.getElementsByClassName('edit__in')[0];
    editBtn.onclick = function() {
        wrap__Del.click();
        var r = new XMLHttpRequest();
        r.open('POST', '/editchat');
        r.setRequestHeader('Content-Type', 'application/json');
        r.send(JSON.stringify({type: 'editChat', index: sel, text: editIn.value}));
        socket.send(JSON.stringify({type: 'editChat', index: sel, text: editIn.value}));
        document.getElementsByClassName('close__select')[0].click();
        editIn.value = '';   
        sel = [];   
       
    }
}
editChat();
function deleteChat() {
    var delbtn = document.getElementsByClassName('delch')[0];
    delbtn.onclick = function() {
        socket.send(JSON.stringify({type: 'deletechat', index: sel}));
        wrap__Del.click();
        var f = new XMLHttpRequest();
        f.open('POST', '/deletechat');
        f.setRequestHeader('Content-Type', 'application/json');
        f.send(JSON.stringify({type: 'deletechat', index: sel}));
        document.getElementsByClassName('close__select')[0].click();
    }
    
}
deleteChat();