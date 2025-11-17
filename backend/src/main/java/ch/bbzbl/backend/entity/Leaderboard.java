package ch.bbzbl.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Data;

@Data
@Entity
@Table(name = "leaderboard")
public class Leaderboard {

    @Id
    private Integer id;

    @Column(name = "user_name")
    private String userName;

    private Integer score;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
}
