function TableTreeUtil(){
this.gridTree=initTableTree();	
this.leaf_img="";
this.folder_img="";
this.folderData;
this.leafData;

}

function initTableTree(){
   var gridTree=new TableTree4J("gridTree","../../../../inc/platform/js/tableTree4j/");	
   gridTree.setImgRootPath("../../../../inc/platform/js/tableTree4j/thame/img_style_blueAll/");//��������ʽ���õ�ͼƬ
   gridTree.config.useIcon=true;   //�����Ƿ���ʾ�ڵ�ͼ��
   //gridTree.config.ischecked=true;//�����Ƿ���ʾ��ѡ��
   //gridTree.config.checkBoxName="qxxk";
   gridTree.tableDesc="<table border=\"1\" class=\"GridView\" width=\"100%\" id=\"table1\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\"  bordercolordark=\"#C0C0C0\" bordercolorlight=\"#C0C0C0\" >";	
   return gridTree;
}	

function loadZzjgNew(){
	var post = "qxxkdm="+request.QueryString("qxxkdm");
	var loadRightUrl="zzjgList.jsp";
	send_request(loadRightUrl,post,loadZzjgDealNew);
}

function loadZzjgDealNew(){
	if (http_request.readyState == 4) { // �ж϶���״̬
        if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
        		//alert(unescape(http_request.responseText))
        		querying--;
				try{
     				eval(unescape(http_request.responseText));
				}catch(e){
					
				}
              if(dmList.length>0){
	                dmList[0].sj1="00";
              }
              var c_dm="";
              var order=0;
              for(i=0;i<dmList.length;i++){
                  var dataList=new Array();
                  var dataListLeaf=new Array();
                  if(dmList[i].dm2){ //ģ���Ҷ�ӽڵ� �� ��ɵ��׽ڵ�
                      if(dmList[i].dm1!=c_dm){ //page and aciton   
                      	//var dataList=new Array(dmList[i].mc1,"","","","");
                       for(var a=0;a<folderData.length;a++){
                    	        if(folderData[a]!=""){
                    	        	dataList[a]=eval(folderData[a]); 
                    	            }else{
                    	            	dataList[a]=folderData[a];
                    	                } 
                    	      	}
                      	//����: dataList,id,pid,booleanOpen,order,url,target,hrefTip,hrefStatusText,classStyle,icon,iconOpen
                      	if(i==0){
                      		gridTree.addGirdNode(dataList,dmList[i].dm1,dmList[i].sj1,true,order,null,null,null,null,null,folder_img,folder_img);
                          	}
                      	else{
                      	    gridTree.addGirdNode(dataList,dmList[i].dm1,dmList[i].sj1,null,order,null,null,null,null,null,folder_img,folder_img);
                          	}
                      	order++;
                    	   for(var a=0;a<leafData.length;a++){
                   	        if(leafData[a]!=""&&a!=leafData.length-1){
                   	        	dataListLeaf[a]=eval(leafData[a]); 
                   	        	//alert("eavl+"+eval(leafData[a]));
                   	            }else if(a==leafData.length-1){
                       	             var hrefObjs=leafData[a];
                   	        	     for(var b=0;b<hrefObjs.length;b++){
                   	        	    	var hrefStr="<span style=\"cursor:pointer;color:blue;\" params=\"";
                       	        	     var hrefText=hrefObjs[b].hrefText;
                       	        	     var params=hrefObjs[b].params;
                       	        	     var func=hrefObjs[b].onclick_func;
                       	        	     for(var c=0;c<params.length;c++){
                                             hrefStr += params[c].name+"="+eval(params[c].value)+"&";
                           	        	     }
 											hrefStr+="\" qxxkdm="+request.QueryString("qxxkdm")+" onclick=\""+func+"\">"+hrefText+"</span>";	
                       	        	     }
                   	        	  dataListLeaf[a]=hrefStr;
                   	                } else{
                   	            	dataListLeaf[a]=leafData[a];
                       	                }
                   	      	}  
                      	gridTree.addGirdNode(dataListLeaf,dmList[i].dm1+"_"+dmList[i].dm2,dmList[i].dm1,null,order,null,null,null,null,null,leaf_img,leaf_img);
                      	order++;
                      }else{//���		
                      //	var dataList=new Array(dmList[i].mc2,dmList[i].zzjg_mc,dmList[i].sj_gw_mc,dmList[i].bz,
                     //   "<a href=\"#\" params=\"GW_DM="+dmList[i].dm2+"&GW_MC="+dmList[i].mc2+"&ZZJG_MC="+dmList[i].zzjg_mc+"&ZZJG_DM="+dmList[i].dm1+"\" qxxkdm=\""+request.QueryString("qxxkdm")+"\" onclick=\"gwFpJs()\">�����ɫ</a>");
                    	  for(var a=0;a<leafData.length;a++){
                     	        if(leafData[a]!=""&&a!=leafData.length-1){
                     	        	dataListLeaf[a]=eval(leafData[a]); 
                     	        	//alert("eavl+"+eval(leafData[a]));
                     	            }else if(a==leafData.length-1){
                         	             var hrefObjs=leafData[a];
                     	        	     for(var b=0;b<hrefObjs.length;b++){
                     	        	    	var hrefStr="<span style=\"cursor:pointer;color:blue;\" params=\"";
                         	        	     var hrefText=hrefObjs[b].hrefText;
                         	        	     var params=hrefObjs[b].params;
                         	        	     var func=hrefObjs[b].onclick_func;
                         	        	     for(var c=0;c<params.length;c++){
                                               hrefStr += params[c].name+"="+eval(params[c].value)+"&";
                             	        	     }
   											hrefStr+="\" qxxkdm="+request.QueryString("qxxkdm")+" onclick=\""+func+"\">"+hrefText+"</span>";	
                         	        	     }
                     	        	  dataListLeaf[a]=hrefStr;
                     	                } else{
                     	            	dataListLeaf[a]=leafData[a];
                         	                }
                     	      	}  
                           	//����: dataList,id,pid,booleanOpen,order,url,target,hrefTip,hrefStatusText,classStyle,icon,iconOpen
                      	gridTree.addGirdNode(dataListLeaf,dmList[i].dm1+"_"+dmList[i].dm2,dmList[i].dm1,null,order,null,null,null,null,null,leaf_img,leaf_img);	
                      	order++;	
				        }
                  }else{ //ģ��ķ�Ҷ�ӽڵ�
                	  for(var a=0;a<folderData.length;a++){
              	        if(folderData[a]!=""){
              	        	dataList[a]=eval(folderData[a]); 
              	            }else{
              	            	dataList[a]=folderData[a];
              	                } 
              	      	}
                  	//var dataList=new Array(dmList[i].mc1,"","","","");
                  	//����: dataList,id,pid,booleanOpen,order,url,target,hrefTip,hrefStatusText,classStyle,icon,iconOpen
                  	gridTree.addGirdNode(dataList,dmList[i].dm1,dmList[i].sj1,null,order,null,null,null,null,null,folder_img,folder_img);	
                  	order++;
                  }
		            c_dm=dmList[i].dm1
	           }
	          // var str = ""+d.addNode(d.root);
	         //  $F('left').innerHTML=str;  
	         //print	
	           gridTree.printTableTreeToElement("left");	
         } else { //ҳ�治����
             alert("���������ҳ�����쳣��");
         }
  }
}