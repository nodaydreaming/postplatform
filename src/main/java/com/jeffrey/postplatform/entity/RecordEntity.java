package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "record", schema = "postplatform")
public class RecordEntity {
    private int recordId;
    private Date recordDate;
    private Integer userId;
    private Integer postId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id", nullable = false)
    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    @Basic
    @Column(name = "record_date", nullable = true)
    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    @Basic
    @Column(name = "user_id", nullable = true)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "post_id", nullable = true)
    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecordEntity that = (RecordEntity) o;
        return recordId == that.recordId &&
                Objects.equals(recordDate, that.recordDate) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(postId, that.postId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recordId, recordDate, userId, postId);
    }

    @Override
    public String toString() {
        return "RecordEntity{" +
                "recordId=" + recordId +
                ", recordDate=" + recordDate +
                ", userId=" + userId +
                ", postId=" + postId +
                '}';
    }
}
