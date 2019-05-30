package com.jeffrey.postplatform.common.filter;

import com.jeffrey.postplatform.entity.AdminEntity;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(filterName = "AdminSessionFilter",urlPatterns = {""})
@Order(value = 1)
public class AdminSessionFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        //如果session不为空就返回该session，如果为空就返回null
        HttpSession session = request.getSession(false);
        HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper((HttpServletResponse) servletResponse);
        //获得根目录所对应的绝对路径
        String currentURL = request.getRequestURI();
//        System.out.println("拦截过滤");
//        System.out.println("用户的访问地址为：" + currentURL);
        //截取到当前文件名用于比较
        String targetURL = currentURL.substring(currentURL.indexOf("/",1));
//        System.out.println(targetURL);
        //判断管理员是否登陆
        if(targetURL.contains("post-admin") || targetURL.contains("delete")) {
            if (session == null || session.getAttribute("admin") == null) {
                wrapper.sendRedirect("/post-platform/admin/login.html");
            }
            else{
                if(targetURL.contains("saveAdmin") || targetURL.contains("findAllAdmins") ||
                    targetURL.contains("deleteAdmin") || targetURL.contains("findAdminById")){
                    AdminEntity loginAdmin = (AdminEntity) session.getAttribute("loginAdmin");
                    //普通管理员没有权限进行上面的操作
                    if(loginAdmin.getAdminLevel() != 2){
                        wrapper.sendRedirect("/post-platform/admin/general");
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
