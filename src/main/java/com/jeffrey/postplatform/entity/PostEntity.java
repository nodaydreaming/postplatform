package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "post", schema = "postplatform")
public class PostEntity {
    private int postId;
    private String postName;
    private String postType;
    private Integer postEmployer;
    private Date postStarttime;
    private Date postEndtime;
    private Date postInterviewDate;
    private Integer postNumber;
    private String postSalary;
    private String postDemand;
    private String postDescription;
    private Integer postState;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    @Basic
    @Column(name = "post_name", nullable = true, length = 255)
    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    @Basic
    @Column(name = "post_type", nullable = true, length = 255)
    public String getPostType() {
        return postType;
    }

    public void setPostType(String postType) {
        this.postType = postType;
    }

    @Basic
    @Column(name = "post_employer", nullable = true)
    public Integer getPostEmployer() {
        return postEmployer;
    }

    public void setPostEmployer(Integer postEmployer) {
        this.postEmployer = postEmployer;
    }

    @Basic
    @Column(name = "post_starttime", nullable = true)
    public Date getPostStarttime() {
        return postStarttime;
    }

    public void setPostStarttime(Date postStarttime) {
        this.postStarttime = postStarttime;
    }
//    public void setPostStarttime(String postStarttime) throws ParseException {
//        this.postStarttime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(postStarttime);
//    }
    @Basic
    @Column(name = "post_endtime", nullable = true)
    public Date getPostEndtime() {
        return postEndtime;
    }

    public void setPostEndtime(Date postEndtime) {
        this.postEndtime = postEndtime;
    }
//    public void setPostEndtime(String postEndtime) throws ParseException {
//        this.postEndtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(postEndtime);
//    }
    @Basic
    @Column(name = "post_interview_date", nullable = true)
    public Date getPostInterviewDate() {
        return postInterviewDate;
    }

    public void setPostInterviewDate(Date postInterviewDate) {
        this.postInterviewDate = postInterviewDate;
    }
//    public void setPostInterviewDate(String postInterviewDate) throws ParseException {
//        this.postInterviewDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(postInterviewDate);
//    }
    @Basic
    @Column(name = "post_number", nullable = true)
    public Integer getPostNumber() {
        return postNumber;
    }

    public void setPostNumber(Integer postNumber) {
        this.postNumber = postNumber;
    }

    @Basic
    @Column(name = "post_salary", nullable = true, length = 255)
    public String getPostSalary() {
        return postSalary;
    }

    public void setPostSalary(String postSalary) {
        this.postSalary = postSalary;
    }

    @Basic
    @Column(name = "post_demand", nullable = true, length = 255)
    public String getPostDemand() {
        return postDemand;
    }

    public void setPostDemand(String postDemand) {
        this.postDemand = postDemand;
    }

    @Basic
    @Column(name = "post_description", nullable = true, length = 255)
    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    @Basic
    @Column(name = "post_state", nullable = true)
    public Integer getPostState() {
        return postState;
    }

    public void setPostState(Integer postState) {
        this.postState = postState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostEntity that = (PostEntity) o;
        return postId == that.postId &&
                Objects.equals(postName, that.postName) &&
                Objects.equals(postType, that.postType) &&
                Objects.equals(postEmployer, that.postEmployer) &&
                Objects.equals(postStarttime, that.postStarttime) &&
                Objects.equals(postEndtime, that.postEndtime) &&
                Objects.equals(postInterviewDate, that.postInterviewDate) &&
                Objects.equals(postNumber, that.postNumber) &&
                Objects.equals(postSalary, that.postSalary) &&
                Objects.equals(postDemand, that.postDemand) &&
                Objects.equals(postDescription, that.postDescription) &&
                Objects.equals(postState, that.postState);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, postName, postType, postEmployer, postStarttime, postEndtime, postInterviewDate, postNumber, postSalary, postDemand, postDescription, postState);
    }

    @Override
    public String toString() {
        return "PostEntity{" +
                "postId=" + postId +
                ", postName='" + postName + '\'' +
                ", postType='" + postType + '\'' +
                ", postEmployer=" + postEmployer +
                ", postStarttime=" + postStarttime +
                ", postEndtime=" + postEndtime +
                ", postInterviewDate=" + postInterviewDate +
                ", postNumber=" + postNumber +
                ", postSalary='" + postSalary + '\'' +
                ", postDemand='" + postDemand + '\'' +
                ", postDescription='" + postDescription + '\'' +
                ", postState=" + postState +
                '}';
    }
}
