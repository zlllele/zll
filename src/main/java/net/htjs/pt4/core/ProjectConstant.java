package net.htjs.pt4.core;

/**
 * Description: 项目常量
 * author  dyenigma
 * date 2017/6/23 15:42
 */
public final class ProjectConstant {
    //项目基础包名称，根据自己的项目修改
    public static final String BASE_PACKAGE = "net.htjs.pt4.demo";

    public static final String MODEL_PACKAGE = BASE_PACKAGE + ".entity";//Model所在包
    public static final String MAPPER_PACKAGE = BASE_PACKAGE + ".dao";//Mapper所在包
    public static final String SERVICE_PACKAGE = BASE_PACKAGE + ".service";//Service所在包
    public static final String SERVICE_IMPL_PACKAGE = SERVICE_PACKAGE + ".impl";//ServiceImpl所在包
    public static final String CONTROLLER_PACKAGE = BASE_PACKAGE + ".controller";//Controller所在包

    public static final String MAPPER_INTERFACE_REFERENCE = "net.htjs.pt4.core.Mapper";//Mapper插件基础接口的完全限定名
}
