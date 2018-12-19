$(document).ready(function(){
    // 显示开票软件
	$(".show_kprj").click(function(){
              //  alert("你好，我是一个警告框！");
		$("#rjjc01").hide();
		$("#rjjc02").hide();
		$("#yjqd01").hide();
		$("#yjqd02").hide();
		$("#kprj01").show();
		$("#kprj02").show();      
		$("#kprj03").show();      
		$("#kprj04").show();                 
	});

   // 显示软件教程
	$(".show_rjjc").click(function(){
            
		$("#rjjc01").show(); 
		$("#rjjc02").show();
		$("#yjqd01").hide();
		$("#yjqd02").hide();
		$("#kprj01").hide();
		$("#kprj02").hide();   
		$("#kprj03").hide();    
		$("#kprj04").hide();     
	});

   // 显示硬件驱动
	$(".show_yjqd").click(function(){
            
		$("#rjjc01").hide();
		$("#rjjc02").hide();
		$("#kprj01").hide();
		$("#kprj02").hide();   
		$("#kprj03").hide();    
		$("#kprj04").hide();  
		$("#yjqd01").show();
		$("#yjqd02").show();   
	});
   //显示全部
	$(".show_qbrj").click(function(){
		$("#kprj01").show();
		$("#kprj02").show();      
		$("#kprj03").show();      
		$("#kprj04").show(); 
		$("#rjjc01").show(); 
		$("#rjjc02").show();  
		$("#yjqd01").show();
		$("#yjqd02").shwow();      
	});
});


