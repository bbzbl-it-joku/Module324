# Kunz - Reflexion Sprint 2

## 1.1. Welche verschiedenen Themen beinhaltete der Sprint?

Dieser Sprint beinhaltete das eigentliche entwickeln und konfigurieren der DevOps Tools. Zu beginn dieses Sprints habe ich mich mit dem Docker Setup für unsere Applikation beschäftigt. Anschliessend habe ich die CI/CD Pipelines überarbeitet. Ich habe sub-pupelines für das frontend und backend erstellt welche die app bauen, linten & testen. Zudem habe ich eine weitere Pipeline erstellt, welche die artefakte des frontend nimmt und in das JAR des backend hineinfügt. Zudem wird daraus ein Docker Image gebaut und ins GHCR gepushed.

Da ich schon viel mehr vohrerfahrung habe, im vergleich zu den andern Team kollegen, wurde ich gebeten vom aktiven entwickeln des Deployment prozesses zurückzutreten und meine kolegen mit meinem vorwissen zu unterstüzen, damit sie auch erfahrung sammeln können und das thema lernen können.

## 1.2. Was haben die Themen mit dem Begriff DevOps zu tun?

Diese Themen sind ganz klar mit dem DevOps Mindset verbunden. Da docker Setup hiflt es den onboarding flow für neue Teammitglieder zu vereinfachen, sodass sie sofort mit dem entwickeln beginnen können. Auch die Github pipelines ist ein integraler teil von devops, da diese den code automatisch und ohne aufwand oder menschlicher intervention, überprüfen um code qualität zu sichern, testen und veröffentlichen.

Auch mein abgeben der DevOps spezifischen tasks ist im sinne dieses mindsets, denn sommit wird die allgemeine kompetenz erhöht und knowledge silos vermieden. Zudem habe ich mit meiner Coaching rolle beim knowledge-sharing prozess viel geholfen.

## 1.3. Hat sich die Kommunikation im Team verändert seit dem ersten Sprint?

Ja, wir haben uns die "fehler" welche wir in der reflexion des letzten sprint 1 erkannt haben behoben. Wir haben unsere kommunikation auf gh issues verlagert, was die übersich stark verbessert hat und es uns erlaubt konversationen auch im nachhinein noch einzusehen. Die Kommunikation im team blieb aber weiterhin sehr gut.

## 1.4. Was ist uns besonders gut gelungen, worauf sind alle richtig stolz?

Überaschenderweise haben wir die Integration des frontend und des backend komplett geschafft. Wir haben nun eine Komplett funktionierende applikation welche vollautomatisch gebaut, released und deployed wird. Uns war von anfang an klar das die Integration der beiden teile die irrelevanteste und letzte aufgabe unserer arbeit ist, da sie gar keinen influss auf die bewertung hat. Viel wichtiger hingegen waren alle devops prozesse welche wir implementiert haben.

## 1.5. Was kann ich nun mehr als vorher?

Obwohl ich schon vorerfahrung mit dem Implementieren von CICD Pipelines habe, habe ich das bissher nur auf gitlab mit dem gitlab syntax gemacht. Ich konnte viel über das GH Actions Mindset und syntax gelernt. Ich habe die unterschiede zwischen den beiden plattformen gemerkt und musste mehr als einmal etwas debuggen nur weil github anders ist. 

Zudem konnte ich lernen, wann es sinn macht aufgaben abzugeben, auch wenn ich sie potenziell schneller und effektiver lösen kann. 

## 1.6. Welche Schwierigkeiten gab es?

Ironischerweise war meine grösste schwierigkeit meine eigene Arbeitsgeschwindigkeit und tendenz aufgaben zu Over-Engineeren. Ich wollte die devops aufgaben selbst lösen und hatte das am anfang des projekts auch in unglaublichem tempo gemacht. Doch im endefekt war es besser das ich diese aufgaben abgegeben habe und in eine coachingrolle gewechselt bin.

## 1.7. Was ist mir besonders gut gelungen, worauf bin ich richtig stolz?

Ich bin vorallem stolz auf die JAR Rebundling Pipeline, welche ich entwickelt habe. Ich habe dabei viel über Java-Deployment Methoden und Frameworks gelernt, was mir auch in zukunft als Java entwickler helfen wird. Ich konnte mein wissen effektiv anwenden um meinen Team Kamaraden zu helfen und sie in ihrem eigenen lernprozess zu unterstüzen.

## 1.8. Was sollte beibehalten werden?

Unsere Teamdynamik und Kommunikation verbesserte sich immer weiter. Das ist sicher etwass was wir beibehalten sollten. Zudem hatten wir die Tasks welche wir nach der letzten Reflektion erstellt haben, sofort mit Akzeptanzkriterien versehen.

## 1.9. Was würden Sie anders machen?

Persönlich muss ich mich auch in zukunft bei der projektplanung eher zurückhalten. Ich habe das in diesem modul noch einmal intensiver gemerkt, dass ich die tendenz dazu habe projekte zu gross zu planen und over-engineeren und viele der Aufgaben "an mich zu reissen". Ich werde sehen, dass ich das in zukunft besser machen kann.
