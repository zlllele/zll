package net.htjs.pt4.sys.util;

import static net.htjs.pt4.sys.Constants.UTF8;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

/**
 * 生成数据库主键的方法
 * 
 * @author xieshiyu
 *
 */
public class UUIDUtils {

	/**
	 * 获得一个UUID
	 * 
	 * @return
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 加密，字符串加密成base64字符串
	 */
	public static String encode(String str) {
		try {
			return encodeByte(str.getBytes(UTF8));
		} catch (UnsupportedEncodingException e) {
		}
		return "";
	}

	/**
	 * 加密，字节组加密成base64字符串
	 */
	public static String encodeByte(byte[] in) {
		return new String(encodeChar(in));
	}

	/**
	 * 解密，base64字符串解密成字符串
	 */
	public static String decode(String s) {
		try {
			return new String(decodebyte(s), UTF8);
		} catch (UnsupportedEncodingException e) {
		}
		return "";
	}

	/**
	 * 解密，base64字符串解密成字节组
	 */
	public static byte[] decodebyte(String s) {
		return decode(s.toCharArray());
	}

	// Mapping table from 6-bit nibbles to Base64 characters.
	private static final char[] map1 = new char[64];
	static {
		int i = 0;
		for (char c = 'A'; c <= 'Z'; c++)
			map1[i++] = c;
		for (char c = 'a'; c <= 'z'; c++)
			map1[i++] = c;
		for (char c = '0'; c <= '9'; c++)
			map1[i++] = c;
		map1[i++] = '+';
		map1[i++] = '/';
	}

	// Mapping table from Base64 characters to 6-bit nibbles.
	private static final byte[] map2 = new byte[128];
	static {
		for (int i = 0; i < map2.length; i++)
			map2[i] = -1;
		for (int i = 0; i < 64; i++)
			map2[map1[i]] = (byte) i;
	}

	/**
	 * Encodes a byte array into Base64 format. No blanks or line breaks are
	 * inserted in the output.
	 * 
	 * @param in
	 *            An array containing the data bytes to be encoded.
	 * @return A character array containing the Base64 encoded data.
	 */
	private static char[] encodeChar(byte[] in) {
		return encode(in, 0, in.length);
	}

	/**
	 * Encodes a byte array into Base64 format. No blanks or line breaks are
	 * inserted in the output.
	 * 
	 * @param in
	 *            An array containing the data bytes to be encoded.
	 * @param iOff
	 *            Offset of the first byte in <code>in</code> to be processed.
	 * @param iLen
	 *            Number of bytes to process in <code>in</code>, starting at
	 *            <code>iOff</code>.
	 * @return A character array containing the Base64 encoded data.
	 */
	private static char[] encode(byte[] in, int iOff, int iLen) {
		int oDataLen = (iLen * 4 + 2) / 3; // output length without padding
		int oLen = ((iLen + 2) / 3) * 4; // output length including padding
		char[] out = new char[oLen];
		int ip = iOff;
		int iEnd = iOff + iLen;
		int op = 0;
		while (ip < iEnd) {
			int i0 = in[ip++] & 0xff;
			int i1 = ip < iEnd ? in[ip++] & 0xff : 0;
			int i2 = ip < iEnd ? in[ip++] & 0xff : 0;
			int o0 = i0 >>> 2;
			int o1 = ((i0 & 3) << 4) | (i1 >>> 4);
			int o2 = ((i1 & 0xf) << 2) | (i2 >>> 6);
			int o3 = i2 & 0x3F;
			out[op++] = map1[o0];
			out[op++] = map1[o1];
			out[op] = op < oDataLen ? map1[o2] : '=';
			op++;
			out[op] = op < oDataLen ? map1[o3] : '=';
			op++;
		}
		return out;
	}

	/**
	 * Decodes a byte array from Base64 format. No blanks or line breaks are
	 * allowed within the Base64 encoded input data.
	 * 
	 * @param in
	 *            A character array containing the Base64 encoded data.
	 * @return An array containing the decoded data bytes.
	 * @throws IllegalArgumentException
	 *             If the input is not valid Base64 encoded data.
	 */
	private static byte[] decode(char[] in) {
		return decode(in, 0, in.length);
	}

	/**
	 * Decodes a byte array from Base64 format. No blanks or line breaks are
	 * allowed within the Base64 encoded input data.
	 * 
	 * @param in
	 *            A character array containing the Base64 encoded data.
	 * @param iOff
	 *            Offset of the first character in <code>in</code> to be
	 *            processed.
	 * @param iLen
	 *            Number of characters to process in <code>in</code>, starting
	 *            at <code>iOff</code>.
	 * @return An array containing the decoded data bytes.
	 * @throws IllegalArgumentException
	 *             If the input is not valid Base64 encoded data.
	 */
	private static byte[] decode(char[] in, int iOff, int iLen) {
		if (iLen % 4 != 0)
			throw new IllegalArgumentException("Length of Base64 encoded input string is not a multiple of 4.");
		while (iLen > 0 && in[iOff + iLen - 1] == '=')
			iLen--;
		int oLen = (iLen * 3) / 4;
		byte[] out = new byte[oLen];
		int ip = iOff;
		int iEnd = iOff + iLen;
		int op = 0;
		while (ip < iEnd) {
			int i0 = in[ip++];
			int i1 = in[ip++];
			int i2 = ip < iEnd ? in[ip++] : 'A';
			int i3 = ip < iEnd ? in[ip++] : 'A';
			if (i0 > 127 || i1 > 127 || i2 > 127 || i3 > 127)
				throw new IllegalArgumentException("Illegal character in Base64 encoded data.");
			int b0 = map2[i0];
			int b1 = map2[i1];
			int b2 = map2[i2];
			int b3 = map2[i3];
			if (b0 < 0 || b1 < 0 || b2 < 0 || b3 < 0)
				throw new IllegalArgumentException("Illegal character in Base64 encoded data.");
			int o0 = (b0 << 2) | (b1 >>> 4);
			int o1 = ((b1 & 0xf) << 4) | (b2 >>> 2);
			int o2 = ((b2 & 3) << 6) | b3;
			out[op++] = (byte) o0;
			if (op < oLen)
				out[op++] = (byte) o1;
			if (op < oLen)
				out[op++] = (byte) o2;
		}
		return out;
	}

	public static void main(String[] args) {
		String bw = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<business id=\"FPKJ\" comment=\"发票开具\">"
				+ "<REQUEST_COMMON_FPKJ class=\"REQUEST_COMMON_FPKJ\">" + "<COMMON_FPKJ_FPT class=\"COMMON_FPKJ_FPT\">"
				+ "<FPQQLSH>1170728135618478905</FPQQLSH>" + "<FHSKFWQ_IP>192.168.1.205</FHSKFWQ_IP>" + "<KPLX>0</KPLX>"
				+ "<BMB_BBH>12.0</BMB_BBH>" + "<ZSFS>0</ZSFS>" + "<XSF_NSRSBH>50012345671180277</XSF_NSRSBH>"
				+ "<XSF_MC>上海百旺测试开票</XSF_MC>" + "<XSF_DZDH>凌空SOHO</XSF_DZDH>" + "<XSF_YHZH>中国建设银行</XSF_YHZH>"
				+ "<GMF_NSRSBH>12345678909876543210</GMF_NSRSBH>" + "<GMF_MC>个人</GMF_MC>" + "<GMF_DZDH>淞虹路</GMF_DZDH>"
				+ "<GMF_YHZH>中国银行</GMF_YHZH>" + "<KPR>王五</KPR>" + "<SKR>张三</SKR>" + "<FHR>李四</FHR>" + "<YFP_DM/>"
				+ "<YFP_HM/>" + "<JSHJ>447.00</JSHJ>" + "<HJJE>411.32</HJJE>" + "<HJSE>35.68</HJSE>" + "<KCE/>"
				+ "<BZ>无</BZ>" + "</COMMON_FPKJ_FPT>" + "<COMMON_FPKJ_XMXXS class=\"COMMON_FPKJ_XMXX\" size=\"2\">"
				+ "<COMMON_FPKJ_XMXX>" + "<FPHXZ>0</FPHXZ>" + "<SPBM>1090513070000000000</SPBM>" + "<ZXBM/>"
				+ "<YHZCBS/>" + "<LSLBS/>" + "<ZZSTSGL/>" + "<XMMC>门票</XMMC>" + "<GGXH>规格型号</GGXH>" + "<DW>张</DW>"
				+ "<XMSL>1</XMSL>" + "<XMDJ>11</XMDJ>" + "<XMJE>100.00</XMJE>" + "<SL>0.17</SL>" + "<SE>17.00</SE>"
				+ "<HSBZ>1</HSBZ>" + "</COMMON_FPKJ_XMXX>" + "<COMMON_FPKJ_XMXX>" + "<FPHXZ>0</FPHXZ>"
				+ "<SPBM>1090513070000000000</SPBM>" + "<ZXBM/>" + "<YHZCBS/>" + "<LSLBS/>" + "<ZZSTSGL/>"
				+ "<XMMC>门票</XMMC>" + "<GGXH>规格型号</GGXH>" + "<DW>张</DW>" + "<XMSL>1</XMSL>" + "<XMDJ>11</XMDJ>"
				+ "<XMJE>311.32</XMJE>" + "<SL>0.06</SL>" + "<SE>18.68</SE>" + "<HSBZ>1</HSBZ>" + "</COMMON_FPKJ_XMXX>"
				+ "</COMMON_FPKJ_XMXXS>" + "</REQUEST_COMMON_FPKJ>" + "</business>";
		System.out.println(bw);
		System.out.println(UUIDUtils.encodeByte(bw.getBytes()));
		System.out.println(UUIDUtils.encode(bw));
		System.out.println(UUIDUtils.decode(UUIDUtils.encode(bw)));
		System.out.println(new String(UUIDUtils.decodebyte(UUIDUtils.encode(bw))));
	}
}
