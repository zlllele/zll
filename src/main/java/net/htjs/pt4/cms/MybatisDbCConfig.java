package net.htjs.pt4.cms;

import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.github.pagehelper.PageHelper;

import java.util.Properties;

import javax.sql.DataSource;

/**
 * Created by zcy on 2017-09-19.
 */
@Configuration
@MapperScan(basePackages = {"net.htjs.pt4.cms.dao"}, sqlSessionFactoryRef = "mainSessionFactory")
public class MybatisDbCConfig {

    @Bean(name = "mainDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.main")
    public DataSource testDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "mainSessionFactory")
    public SqlSessionFactory testSqlSessionFactory(@Qualifier("mainDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/cms/*/*.xml"));
        //配置分页插件，详情请查阅官方文档
        PageHelper pageHelper = new PageHelper();
        Properties properties = new Properties();
        properties.setProperty("pageSizeZero", "true");//分页尺寸为0时查询所有纪录不再执行分页
        properties.setProperty("reasonable", "true");//页码<=0 查询第一页，页码>=总页数查询最后一页
        properties.setProperty("supportMethodsArguments", "true");//支持通过 Mapper 接口参数来传递分页参数
        pageHelper.setProperties(properties);
        bean.setTypeAliasesPackage("net.htjs.pt4.cms.entity");
        //添加插件
        bean.setPlugins(new Interceptor[]{pageHelper});
        return bean.getObject();
    }

    @Bean(name = "mainTransactionManager")
    public DataSourceTransactionManager testTransactionManager(@Qualifier("mainDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "mainSessionTemplate")
    public SqlSessionTemplate testSqlSessionTemplate(@Qualifier("mainSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
