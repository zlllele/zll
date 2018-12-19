<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page language="java" contentType="text/html; charset=GBK"%>
 <table width="220" border="0" align="center" cellpadding="0" cellspacing="0">
 	     <htjs:iterator  sid="selectOA_ZNXX_XX">
          <tr>
            <td class="btg">
            	<div class="dxx ">
            		<div class="dxxn1">
            			<htjs:get property="FROM_DM" convert="<%=net.htjs.util.Properties.DM_CZRY %>"/>
            			<span class="info_data">
            				(<htjs:get property="FSSJ" convert="date"/>)
            			</span>
            		</div>
	            	<div class="dxxn2"> 
	            		<img src="/images/<htjs:get property="READFLAG" convert="N:newmsg;oldmsg;"/>.gif" border=0>
	            		<a href="javascript:readMsg('<htjs:get property="BH"/>')">
	            		<htjs:get property="XXBT"/>
	            		</a>
		            </div>
	            </div>
            </td>
          </tr>
 	     </htjs:iterator>	
        </table>
