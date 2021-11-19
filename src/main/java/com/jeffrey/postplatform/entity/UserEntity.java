package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "postplatform")
public class UserEntity {
    private int userId;
    private String userUsername;
    private String userPassword;
    private String userName;
    private String userGender;
    private String userTel;
    private String userEmail;
    private String userStuNumber;
    private String userCollege;
    private String userClass;
    private Double userReputation;
    private Date userCreateDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "user_username", nullable = true, length = 255)
    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
    }

    @Basic
    @Column(name = "user_password", nullable = true, length = 255)
    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    @Basic
    @Column(name = "user_name", nullable = true, length = 255)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "user_gender", nullable = true, length = 10)
    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    @Basic
    @Column(name = "user_tel", nullable = true, length = 11)
    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel;
    }

    @Basic
    @Column(name = "user_email", nullable = true, length = 255)
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Basic
    @Column(name = "user_stu_number", nullable = true, length = 20)
    public String getUserStuNumber() {
        return userStuNumber;
    }

    public void setUserStuNumber(String userStuNumber) {
        this.userStuNumber = userStuNumber;
    }

    @Basic
    @Column(name = "user_college", nullable = true, length = 255)
    public String getUserCollege() {
        return userCollege;
    }

    public void setUserCollege(String userCollege) {
        this.userCollege = userCollege;
    }

    @Basic
    @Column(name = "user_class", nullable = true, length = 255)
    public String getUserClass() {
        return userClass;
    }

    public void setUserClass(String userClass) {
        this.userClass = userClass;
    }

    @Basic
    @Column(name = "user_reputation", nullable = true, precision = 2)
    public Double getUserReputation() {
        return userReputation;
    }

    public void setUserReputation(Double userReputation) {
        this.userReputation = userReputation;
    }

    @Basic
    @Column(name = "user_create_date", nullable = true)
    public Date getUserCreateDate() {
        return userCreateDate;
    }

    public void setUserCreateDate(Date userCreateDate) {
        this.userCreateDate = userCreateDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return userId == that.userId &&
                Objects.equals(userUsername, that.userUsername) &&
                Objects.equals(userPassword, that.userPassword) &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(userGender, that.userGender) &&
                Objects.equals(userTel, that.userTel) &&
                Objects.equals(userEmail, that.userEmail) &&
                Objects.equals(userStuNumber, that.userStuNumber) &&
                Objects.equals(userCollege, that.userCollege) &&
                Objects.equals(userClass, that.userClass) &&
                Objects.equals(userReputation, that.userReputation) &&
                Objects.equals(userCreateDate, that.userCreateDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, userUsername, userPassword, userName, userGender, userTel, userEmail, userStuNumber, userCollege, userClass, userReputation, userCreateDate);
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userId=" + userId +
                ", userUsername='" + userUsername + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userName='" + userName + '\'' +
                ", userGender='" + userGender + '\'' +
                ", userTel='" + userTel + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userStuNumber='" + userStuNumber + '\'' +
                ", userCollege='" + userCollege + '\'' +
                ", userClass='" + userClass + '\'' +
                ", userReputation=" + userReputation +
                ", userCreateDate=" + userCreateDate +
                '}';
    }
}
