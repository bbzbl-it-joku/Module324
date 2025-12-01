package ch.bbzbl.backend.service;

import ch.bbzbl.backend.entity.Leaderboard;
import ch.bbzbl.backend.repository.LeaderboardRepository;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class DemoDataService {

    @Inject
    LeaderboardRepository leaderboardRepository;

    @ConfigProperty(name = "quarkus.profile")
    String profile;

    @Transactional
    public void loadDemoData(@Observes StartupEvent event) {
        // Only load demo data in development profile
        if (!"dev".equals(profile)) {
            return;
        }

        // Check if data already exists to avoid duplicates
        if (leaderboardRepository.count() > 0) {
            return;
        }

        // Create demo leaderboard entries
        List<Leaderboard> demoData = List.of(
            createLeaderboardEntry("Alice", 1500, 5, "easy"),
            createLeaderboardEntry("Bob", 2300, 4, "medium"),
            createLeaderboardEntry("Charlie", 850, 3, "easy"),
            createLeaderboardEntry("Diana", 3200, 2, "hard"),
            createLeaderboardEntry("Eve", 1850, 1, "medium"),
            createLeaderboardEntry("Frank", 950, 0, "easy"),
            createLeaderboardEntry("Grace", 2750, 0, "hard"),
            createLeaderboardEntry("Henry", 1200, 0, "medium"),
            createLeaderboardEntry("Ivy", 4100, 0, "hard"),
            createLeaderboardEntry("Jack", 650, 0, "easy")
        );

        // Persist all demo data
        leaderboardRepository.persist(demoData);
    }

    private Leaderboard createLeaderboardEntry(String userName, int score, int daysAgo, String difficulty) {
        Leaderboard entry = new Leaderboard();
        entry.setUserName(userName);
        entry.setScore(score);
        entry.setDifficulty(difficulty);

        Instant timestamp = daysAgo > 0
            ? Instant.now().minus(daysAgo, ChronoUnit.DAYS)
            : Instant.now().minus((int)(Math.random() * 24), ChronoUnit.HOURS);

        entry.setCreatedAt(timestamp);
        entry.setUpdatedAt(timestamp);

        return entry;
    }
}
