package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "employer", schema = "postplatform")
public class EmployerEntity {
    private int employerId;
    private String employerName;
    private String employerContact;
    private String employerTel;
    private String employerType;
    private String employerDescription;
    private Double employerReputation;
    private int orderId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employer_id", nullable = false)
    public int getEmployerId() {
        return employerId;
    }

    public void setEmployerId(int employerId) {
        this.employerId = employerId;
    }

    @Basic
    @Column(name = "employer_name", nullable = true, length = 255)
    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    @Basic
    @Column(name = "employer_contact", nullable = true, length = 255)
    public String getEmployerContact() {
        return employerContact;
    }

    public void setEmployerContact(String employerContact) {
        this.employerContact = employerContact;
    }

    @Basic
    @Column(name = "employer_tel", nullable = true, length = 255)
    public String getEmployerTel() {
        return employerTel;
    }

    public void setEmployerTel(String employerTel) {
        this.employerTel = employerTel;
    }

    @Basic
    @Column(name = "employer_type", nullable = true, length = 255)
    public String getEmployerType() {
        return employerType;
    }

    public void setEmployerType(String employerType) {
        this.employerType = employerType;
    }

    @Basic
    @Column(name = "employer_description", nullable = true, length = 255)
    public String getEmployerDescription() {
        return employerDescription;
    }

    public void setEmployerDescription(String employerDescription) {
        this.employerDescription = employerDescription;
    }

    @Basic
    @Column(name = "employer_reputation", nullable = true, precision = 0)
    public Double getEmployerReputation() {
        return employerReputation;
    }

    public void setEmployerReputation(Double employerReputation) {
        this.employerReputation = employerReputation;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployerEntity that = (EmployerEntity) o;
        return employerId == that.employerId &&
                Objects.equals(employerName, that.employerName) &&
                Objects.equals(employerContact, that.employerContact) &&
                Objects.equals(employerTel, that.employerTel) &&
                Objects.equals(employerType, that.employerType) &&
                Objects.equals(employerDescription, that.employerDescription) &&
                Objects.equals(employerReputation, that.employerReputation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employerId, employerName, employerContact, employerTel, employerType, employerDescription, employerReputation);
    }

    @Override
    public String toString() {
        return "EmployerEntity{" +
                "employerId=" + employerId +
                ", employerName='" + employerName + '\'' +
                ", employerContact='" + employerContact + '\'' +
                ", employerTel='" + employerTel + '\'' +
                ", employerType='" + employerType + '\'' +
                ", employerDescription='" + employerDescription + '\'' +
                ", employerReputation=" + employerReputation +
                '}';
    }
}
