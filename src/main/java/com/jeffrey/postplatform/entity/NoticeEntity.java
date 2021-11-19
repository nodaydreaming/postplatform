package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "notice", schema = "postplatform")
public class NoticeEntity {
    private int noticeId;
    private String noticeTitle;
    private String noticeContent;
    private String noticeAuthor;
    private Date noticeDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id", nullable = false)
    public int getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(int noticeId) {
        this.noticeId = noticeId;
    }

    @Basic
    @Column(name = "notice_title", nullable = true, length = 255)
    public String getNoticeTitle() {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    @Basic
    @Column(name = "notice_content", nullable = true, length = 255)
    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    @Basic
    @Column(name = "notice_author", nullable = true, length = 255)
    public String getNoticeAuthor() {
        return noticeAuthor;
    }

    public void setNoticeAuthor(String noticeAuthor) {
        this.noticeAuthor = noticeAuthor;
    }

    @Basic
    @Column(name = "notice_date", nullable = true)
    public Date getNoticeDate() {
        return noticeDate;
    }

    public void setNoticeDate(Date noticeDate) {
        this.noticeDate = noticeDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NoticeEntity that = (NoticeEntity) o;
        return noticeId == that.noticeId &&
                Objects.equals(noticeTitle, that.noticeTitle) &&
                Objects.equals(noticeContent, that.noticeContent) &&
                Objects.equals(noticeAuthor, that.noticeAuthor) &&
                Objects.equals(noticeDate, that.noticeDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(noticeId, noticeTitle, noticeContent, noticeAuthor, noticeDate);
    }

    @Override
    public String toString() {
        return "NoticeEntity{" +
                "noticeId=" + noticeId +
                ", noticeTitle='" + noticeTitle + '\'' +
                ", noticeContent='" + noticeContent + '\'' +
                ", noticeAuthor='" + noticeAuthor + '\'' +
                ", noticeDate=" + noticeDate +
                '}';
    }
}
