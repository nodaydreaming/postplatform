package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "admin", schema = "postplatform")
public class AdminEntity {
    private int adminId;
    private String adminUsername;
    private String adminPassword;
    private String adminName;
    private String adminGender;
    private String adminTel;
    private String adminEmail;
    private Integer adminLevel;
    private String adminPhoto;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id", nullable = false)
    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    @Basic
    @Column(name = "admin_username", nullable = true, length = 255)
    public String getAdminUsername() {
        return adminUsername;
    }

    public void setAdminUsername(String adminUsername) {
        this.adminUsername = adminUsername;
    }

    @Basic
    @Column(name = "admin_password", nullable = true, length = 255)
    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    @Basic
    @Column(name = "admin_name", nullable = true, length = 255)
    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    @Basic
    @Column(name = "admin_gender", nullable = true, length = 2)
    public String getAdminGender() {
        return adminGender;
    }

    public void setAdminGender(String adminGender) {
        this.adminGender = adminGender;
    }

    @Basic
    @Column(name = "admin_tel", nullable = true, length = 11)
    public String getAdminTel() {
        return adminTel;
    }

    public void setAdminTel(String adminTel) {
        this.adminTel = adminTel;
    }

    @Basic
    @Column(name = "admin_email", nullable = true, length = 255)
    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    @Basic
    @Column(name = "admin_level", nullable = true)
    public Integer getAdminLevel() {
        return adminLevel;
    }

    public void setAdminLevel(Integer adminLevel) {
        this.adminLevel = adminLevel;
    }

    @Basic
    @Column(name = "admin_photo", nullable = true, length = 255)
    public String getAdminPhoto() {
        return adminPhoto;
    }

    public void setAdminPhoto(String adminPhoto) {
        this.adminPhoto = adminPhoto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdminEntity that = (AdminEntity) o;
        return adminId == that.adminId &&
                Objects.equals(adminUsername, that.adminUsername) &&
                Objects.equals(adminPassword, that.adminPassword) &&
                Objects.equals(adminName, that.adminName) &&
                Objects.equals(adminGender, that.adminGender) &&
                Objects.equals(adminTel, that.adminTel) &&
                Objects.equals(adminEmail, that.adminEmail) &&
                Objects.equals(adminLevel, that.adminLevel) &&
                Objects.equals(adminPhoto, that.adminPhoto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(adminId, adminUsername, adminPassword, adminName, adminGender, adminTel, adminEmail, adminLevel, adminPhoto);
    }

    @Override
    public String toString() {
        return "AdminEntity{" +
                "adminId=" + adminId +
                ", adminUsername='" + adminUsername + '\'' +
                ", adminPassword='" + adminPassword + '\'' +
                ", adminName='" + adminName + '\'' +
                ", adminGender='" + adminGender + '\'' +
                ", adminTel='" + adminTel + '\'' +
                ", adminEmail='" + adminEmail + '\'' +
                ", adminLevel=" + adminLevel +
                ", adminPhoto='" + adminPhoto + '\'' +
                '}';
    }
}
