package com.jeffrey.postplatform.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "type", schema = "postplatform")
public class TypeEntity {
    private int typeId;
    private String typeName;
    private String typeDescription;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id", nullable = false)
    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    @Basic
    @Column(name = "type_name", nullable = true, length = 255)
    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    @Basic
    @Column(name = "type_description", nullable = true, length = 255)
    public String getTypeDescription() {
        return typeDescription;
    }

    public void setTypeDescription(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TypeEntity that = (TypeEntity) o;
        return typeId == that.typeId &&
                Objects.equals(typeName, that.typeName) &&
                Objects.equals(typeDescription, that.typeDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(typeId, typeName, typeDescription);
    }

    @Override
    public String toString() {
        return "TypeEntity{" +
                "typeId=" + typeId +
                ", typeName='" + typeName + '\'' +
                ", typeDescription='" + typeDescription + '\'' +
                '}';
    }
}
