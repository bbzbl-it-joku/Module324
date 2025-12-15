# KAMAL

## Was ist Kamal?

[Kamal](https://kamal-deploy.org/) ist ein "Utility-Framework" mit deren Hilfe eine Web-Applikation als docker-image,
auf einen beliebigen ubuntu Server ausgeliefert (deployt) werden kann.

## Wieso verwenden wir Kamal im Modul?

Durch das _AWS-Learner-Lab_ haben wir die Möglichkeit eine beliebige AWS Infrastruktur aufzubauen.
Dieses Modul liegt jedoch den Fokus auf DevOps und nicht auf Cloud Infrastruktur.

Durch `Kamal` brauchen wir auf AWS "nur" eine Ubuntu Instanz (mit all den Netzwerkpolicies und co.) aufzusetzen.
Der Rest wird durch `Kamal` automatisiert. Es könnte z.B. Auch einfach eine DB gestartet werden.

> [!TIP]
>
> `Kamal` funktioniert Cloud-Provider unabhängig! Ihr könnt damit überall deployen, sogar auf eigene Server zu Hause!

## Was macht `kamal setup`?

1. Via SSH zur `KAMAL_SERVER_IP` Verbinden
2. `docker` und `curl` auf dem Server installieren, wenn nicht schon vorhanden
3. In die Docker Registry einloggen.
4. Das `Dockerfile` bauen.
5. Das Docker-Image von lokal in die Registry hochladen (pushen)
6. Das Docker-Image auf dem Server von der Docker Registry herunterladen (pullen)
7. Alle Environment Variablen vom .env zum Server laden
8. Garantiert dass [Traefik](https://doc.traefik.io/traefik/) (ein Load-Balancer) auf Port 80 läuft
9. Verbindet die App im Docker-Image via `Traefik`. Verwendet dazu einen Healthcheck auf dem Pfad `/up`
10. Startet einen neuen Container mit dem neuen Docker-Image
11. Stoppt den alten Container, sofern vorhanden, sobald das neue Image läuft.
12. Löscht alte Container

> [!INFO]
>
> Dies alles erhält ihr durch `Kamal` gratis! So kann ohne downtime, einfach WebApps überall deployed werden.

> [!TIP]
>
> Nach einem Setup kann auch `kamal deploy` verwendet werden.

## Wieso Ruby?

`Kamal` ist von den Machern von RubyOnRails. Ist jedoch nicht darauf isoliert, wird aber vor allem in der Ruby Welt eingesetzt.
Lasst euch nicht von Ruby stören, ihr könnt euer Projekt in jeder beliebigen Sprache erstellen!
