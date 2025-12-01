package ch.bbzbl.backend.service;

import ch.bbzbl.backend.dto.LeaderboardDTO;
import ch.bbzbl.backend.entity.Leaderboard;
import ch.bbzbl.backend.repository.LeaderboardRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class LeaderboardService {

    @Inject
    LeaderboardRepository leaderboardRepository;

    public List<LeaderboardDTO> getTop10(String difficulty) {
        return leaderboardRepository.findTop10ByScoreDesc(difficulty).stream()
                .map(this::toDTO)
                .toList();
    }

    public List<LeaderboardDTO> getAll() {
        return leaderboardRepository.listAll().stream().map(this::toDTO).toList();
    }

    public LeaderboardDTO getById(Integer id) {
        Leaderboard leaderboard = leaderboardRepository.findById(id.longValue());
        return leaderboard != null ? toDTO(leaderboard) : null;
    }

    @Transactional
    public LeaderboardDTO create(LeaderboardDTO dto) {
        Leaderboard leaderboard = toEntity(dto);
        leaderboard.setId(null);
        leaderboard.setCreatedAt(Instant.now());
        leaderboard.setUpdatedAt(Instant.now());
        leaderboardRepository.persist(leaderboard);
        return toDTO(leaderboard);
    }

    @Transactional
    public LeaderboardDTO update(Integer id, LeaderboardDTO dto) {
        Leaderboard leaderboard = leaderboardRepository.findById(id.longValue());
        if (leaderboard == null) {
            return null;
        }
        if (dto.getUserName() != null) {
            leaderboard.setUserName(dto.getUserName());
        }
        if (dto.getScore() != null) {
            leaderboard.setScore(dto.getScore());
        }
        leaderboard.setUpdatedAt(Instant.now());
        leaderboardRepository.persist(leaderboard);
        return toDTO(leaderboard);
    }

    @Transactional
    public boolean delete(Integer id) {
        return leaderboardRepository.deleteById(id.longValue());
    }

    private LeaderboardDTO toDTO(Leaderboard entity) {
        return new LeaderboardDTO(
                entity.getId(), entity.getUserName(), entity.getScore(), entity.getCreatedAt(), entity.getUpdatedAt(), entity.getDifficulty()
        );
    }

    private Leaderboard toEntity(LeaderboardDTO dto) {
        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setId(dto.getId());
        leaderboard.setUserName(dto.getUserName());
        leaderboard.setScore(dto.getScore());
        leaderboard.setCreatedAt(dto.getCreatedAt());
        leaderboard.setUpdatedAt(dto.getUpdatedAt());
        leaderboard.setDifficulty(dto.getDifficulty());
        return leaderboard;
    }

}
