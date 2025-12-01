package ch.bbzbl.backend.repository;

import ch.bbzbl.backend.entity.Leaderboard;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class LeaderboardRepository implements PanacheRepository<Leaderboard> {

    public Leaderboard findByNameAndByScoreDesc(String name) {
        return find("name = ?1 ORDER BY score DESC", name).firstResult();
    }

    public List<Leaderboard> findTop10ByScoreDesc(String difficulty) {
        return find("difficulty LIKE ?1 ORDER BY score DESC", difficulty).page(Page.ofSize(10)).list();
    }
}
