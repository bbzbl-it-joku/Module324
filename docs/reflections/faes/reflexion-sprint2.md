# Inhalt
## 1.1. Welche verschiedenen Themen beinhaltete der Sprint?
Der Sprint beinhaltete folgende Themen:
- Versionierung (major.minor.patch)
- Building/Pushing von Docker-Images in einer Github Action
- Conventional Commits
- Terraform

## 1.2. Was haben die Themen mit dem Begriff DevOps zu tun?
Die Versionierung hat per se nichts mit DevOps zu tun, aber ist im Allgemeinen wichtig, weil kryptische Versionsnummern (Git-Hashes, usw.) meistens nichts bringen. Wenn die Versionierung richtig gemacht wird, dann weiss der Anwender direkt, wie gross/was das Update für ihn bereithält ohne in die Changelogs zu schauen. Conventional Commits haben einen ähnlichen Nutzen. Sie geben dem Reviewer eine kurze Beschreibung des Commits, inklusive Typ, optional Ort und ob ein Breaking Change beinhaltet ist oder nicht.
Das Building/Pushing von Docker-Images in einer Github Action ist essenziell, weil Docker-Images plattformunabhängig funktionieren. Im Zusammenhang mit DevOps, ist das der CI-Teil. Es kann automatisiert die Applikation gebaut werden, welche dann im CD-Teil automatisch deployed wird.
Terraform ist auch ein sehr nützliches Tool, weil damit fast plattformunabhängig Infrastruktur definiert werden kann. Für DevOps sehr nützlich, weil damit automatisiert Infrastruktur erstellt/managed werden kann. 

# Gruppendynamik

## 1.3. Hat sich die Kommunikation im Team verändert seit dem ersten Sprint?
Ich denke, dass sich die Kommunikation auf jedem Fall nicht verbessert hat. Wir hatten Infrastrukur-Tasks, die eigentlich jemand ausser Josh hätte machen sollen. Allerdings wurden sie zum Schluss wieder alle durch Josh gemacht.  

## 1.4. Was ist uns besonders gut gelungen, worauf sind alle richtig stolz?
Uns ist das Spiel gut gelungen. Es funktioniert, hat alle Features, die wir wollten und macht Spass.

# Lernzuwachs

## 1.5. Was kann ich nun mehr als vorher?
Ich verstehe nun Terraform als Tool besser und konnte mich mit Kamal ein bisschen auseinander setzen. Github Action waren mir ja bereits bekannt, aber mit den, mir neuen, Tools, war es zum Teil ein bisschen schwer alles nachzuvollziehen. 

## 1.6. Welche Schwierigkeiten gab es?
Es gab sicher Schwierigkeiten mit der Infrastruktur und bei der CI-Pipeline. Ich habe Terraform und Kamal bisher noch nicht gekannt, bzw. nur schon mal davon gehört. Mein Auftrag war es eigentlich, die Infrastruktur-Task, welche dann allerdings durch Josh übernommen wurde. Ich hatte lokal bereits schon Sachen gemacht, aber er war mir dort zuvorgekommen. 

## 1.7. Was ist mir besonders gut gelungen, worauf bin ich richtig stolz?
Ich denke, dass mir diesen Sprint nicht viel gut gelungen ist. Das Backend war bereits fast fertig und ich habe eher eine unterstützende Rolle eingenommen. Ich habe PRs, zum Beispiel für die Pipelines, reviewt. Da allerdings das Image/JAR korrupt ist, habe ich dort aber etwas übersehen. 

# Lerneffekt (bezogen auf das Modul)

## 1.8. Was sollte beibehalten werden?
Ich würde alles so beibehalten. Ich fand es gut, dass ein Projekt mit kurzen Theorieblöcken durchgeführt wurde und nicht nur stumpfsinnig Theorie angeschaut und Commands/Code kopiert wurde.

## 1.9. Was würden Sie anders machen?
Gute Frage, ich habe keinen konkreten Vorschlag für eine Veränderung des Moduls. Wenn sich das auf unser Projekt auch noch bezieht, dann ist sicher ein Lerneffekt, dass wir nicht eine Person haben sollen, die über ein Thema alles weiss und macht, ohne dass andere Personen das gleiche Wissen besitzen. 
