/** �����dialogģʽ����
 * @copyright digitalChina 2003
 * @author zhanggx
 * @date 2003-8-20
 */

/** ��ʼ��ִ��
 */
function adjustWin(){
	var obj = document.body.children(document.body.children.length-1);
	var height = obj.offsetTop+obj.offsetHeight + 45;
	window.dialogTop = (window.screen.height - height)/2;
	window.dialogHeight = height+"px";
}