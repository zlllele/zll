		var f_nearid="";
		var f_peerid="";
		
		function receivePublicMessages(msg){
			center1.innerHTML=center1.innerHTML+msg+"<br>";
		}
		
		function setOutByServicer(){
			msgDisplay.value=msgDisplay.value+"\n"+"ϵͳ ("+(getCurrentTime())+")����������ʱ��û�з��ԣ��������ߣ��������������ѡ��ͷ���\n";
			msgToSend.disabled=true;
			
		}

		function receivePrivateMessages(msg,czry_dm,czry_mc,customerid,customername){
			Sound.play('/inc/sound/msg.wav');
			msgDisplay.value=msgDisplay.value+"\n"+"��"+czry_mc+"��("+(getCurrentTime())+")��"+msg[0].message+"\n";
			msgDisplay.scrollTop   =   msgDisplay.scrollHeight; 
		}
		
		
		function receivePeerId(czry_dm,customerid,nearid){
			f_peerid=nearid;
		}
		function sendMyNearId(nearId){
			f_nearid=nearid;
			PrivateChatJS.sendMyNearId(toUserId.value,'userid',nearId,"0");
		}
		
		function setKhxx(khsh,khmc){
			setCookie("khsh",khsh);
			setCookie("khmc",khmc);
		}
		
		window.onbeforeunload = onbeforeunload_handler;     

		function onbeforeunload_handler(){ 
		}     
		function logout(){
		}
		
		function sendMsg(){
			if(msgToSend.value!="")
				msgDisplay.value=msgDisplay.value+"\n"+"�� ("+(getCurrentTime())+")��"+msgToSend.value+"\n";
			
			$F("CONTENT").value=msgToSend.value;			
			form1.submit();
			msgToSend.value="";
			msgDisplay.scrollTop   =   msgDisplay.scrollHeight; 
		}
		
		var isCtrlDown=false;
		function checkInput(){
			if(event.keyCode==17){
				isCtrlDown=true;
			}else if(event.keyCode==13){
				if(isCtrlDown){
					sendMsg();
				}
			}
		}
		function checkCtrl(){
			if(event.keyCode==17){
				isCtrlDown=false;
			}
			//previewMsg();
		}
		
		var interV = setInterval("getMessage()",5000);
		isFile=1;
		function getMessage(){
			window.opener.parent.addChatMember($FV("FROM_CZRY_DM"));
			send_request_update("newMessage.jsp?FROM_CZRY_DM="+$FV("TO_CZRY_DM")+"&clear=1"+(isFile==1?"&ISFILE=1":""),"",$F("new_msg"));
			isFile++;
		}
		window.attachEvent("onload",getMessage);
		function newMessageArrive(message){
			if(message!=""){
				Sound.play('/inc/sound/msg.wav');
				msgDisplay.value =msgDisplay.value +"\n"+message.replace(/<br>/ig,'\n');
				msgDisplay.scrollTop   =   msgDisplay.scrollHeight; 
				if(message.indexOf("����գ�")!=-1){
					loadContent('fileTransfer.jsp','div_right_bottom')
				}
			}
		}
		
		function doUpload(){
			if(upForm.fileupload.value==""){
				alert("��ѡ��Ҫ���͵��ļ���")
				return false;
			}
			//lockPanle("div_right_bottom");
			upForm.submit();
			return true;
		}
		
		function loadContent(url,target){
			if(!isLocked(target)){
				send_request_update(url+"?CZRY_DM="+$FV("TO_CZRY_DM"),"",$F(target));
			}else{
				alert("����ʧ�ܣ����Ժ����ԣ�");
			}
		}
		
		var panle = [];
		function lockPanle(panleName){
			if(panle.indexOf(panleName)==-1){
				panle[panle.length]=panleName
				return true;
			}else{
				return false;
			}
		}
		function isLocked(panleName){
			if(panle.indexOf(panleName)!=-1){
				return true;
			}else{
				return false;
			}
		}
		function unLockPanle(panleName){
			if(panle.indexOf(panleName)!=-1){
				panle.splice(panle.indexOf(panleName), 1)
			}
		}
		
		function refuse(id){
			send_request("fileRefuse.jsp?id="+id,"",refuse_deal);
		}
		function fileDown(id){
			loadContent('fileTransfer.jsp','div_right_bottom')
			bdSave.location="fileDown.jsp?id="+id;
		}
		function refuse_deal() {
		    if (http_request.readyState == 4) { // �ж϶���״̬
		          if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
		        	  querying--;
		        	  loadContent('fileTransfer.jsp','div_right_bottom')
		           } else { //ҳ�治����
		           }
		    }
		}