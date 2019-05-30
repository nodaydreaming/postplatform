package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "post", schema = "postplatform")
public class PostEntity {
    private int postId;
    private String postName;
    private String postType;
    private Date postStarttime;
    private Date postEndtime;
    private Integer postNumber;
    private String postSalary;
    private String postDescription;
    private String postState;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
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
    @Column(name = "post_starttime", nullable = true)
    public Date getPostStarttime() {
        return postStarttime;
    }

    public void setPostStarttime(Date postStarttime) {
        this.postStarttime = postStarttime;
    }

    @Basic
    @Column(name = "post_endtime", nullable = true)
    public Date getPostEndtime() {
        return postEndtime;
    }

    public void setPostEndtime(Date postEndtime) {
        this.postEndtime = postEndtime;
    }

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
    @Column(name = "post_description", nullable = true, length = 255)
    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    @Basic
    @Column(name = "post_state", nullable = true, length = 255)
    public String getPostState() {
        return postState;
    }

    public void setPostState(String postState) {
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
                Objects.equals(postStarttime, that.postStarttime) &&
                Objects.equals(postEndtime, that.postEndtime) &&
                Objects.equals(postNumber, that.postNumber) &&
                Objects.equals(postSalary, that.postSalary) &&
                Objects.equals(postDescription, that.postDescription) &&
                Objects.equals(postState, that.postState);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, postName, postType, postStarttime, postEndtime, postNumber, postSalary, postDescription, postState);
    }

    @Override
    public String toString() {
        return "PostEntity{" +
                "postId=" + postId +
                ", postName='" + postName + '\'' +
                ", postType='" + postType + '\'' +
                ", postStarttime=" + postStarttime +
                ", postEndtime=" + postEndtime +
                ", postNumber=" + postNumber +
                ", postSalary='" + postSalary + '\'' +
                ", postDescription='" + postDescription + '\'' +
                ", postState='" + postState + '\'' +
                '}';
    }
}
