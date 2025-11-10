package ch.bbzbl.backend.entity;

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

    private String userName;
    private Integer score;
    private Instant createdAt;
    private Instant updatedAt;
}
