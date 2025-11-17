package ch.bbzbl.backend.dto;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardDTO {

    private Integer id;
    private String userName;
    private Integer score;
    private Instant createdAt;
    private Instant updatedAt;
}
