# Boss - Reflexion Sprint 2
## 1.1. Welche verschiedenen Themen beinhaltete der Sprint?

In diesem Sprint haben wir die Themen Testing und vor allem automatisiertes Testing, Docker und Docker-Compose und das ganze AWS Setup und AWS Deployment angeschaut. 
Wir haben gelernt, wie man das Testing automatisiert in einer CI Pipeline ausführt.
Beim Dockerfile haben wir die unterschiedlichen Befehle innerhalb des Dockerfiles angeschaut und zum Beispiel auch gelernt wie mann mehrere Images in einem Dockerfile verwendet kann (zum Beispiel eines um das Projekt zu Builden/Linten/Testen und eines für die Auslierferung), damit das fertige Image möglichst klein ist. 
Heute haben wir nochmals Terraform genauer angeschaut mit den unterschiedlichen Files und Konfigurationen.

## 1.2. Was haben die Themen mit dem Begriff DevOps zu tun?

Diese Themen sind (vor allem Docker & AWS) die letzten Schritte des CI/CD Worfkflows. Sie kümmern sich um das Auslierfern der Applikation, also um die CD. 
Zuvor haben wir angeschaut, wie wir das Projekt automatisiert Builden und Linten und, in diesem Sprint auch, Testen können, das alles gehört zu CI.
Diese Themen ermöglichen es einem die Applikation während jeder Zeit lauffähig und korrekt zu halten und gleichzeitig die Applikation automatisiert Auszulierfern.
Diese Tools und Workflows sind genau das, was DevOps ist, nähmlich: Prozesse die das Entwickeln und Ausliefern für den Developer einfacher machen!

## 1.3. Hat sich die Kommunikation im Team verändert seit dem ersten Sprint?
Ich habe das Gefühl, die Kommunikation im Team verlief einigermassen gut. 
Wir hatten bis in der letzten Woche eingentlich nie das Problem, dass einer nicht wusste, was er machen sollte.
Somit hat sich dabei, eigentlich nicht viel geändert.
Gegen Ende hatten wir das Problem, dass wir ziemlich stressen mussten und Stand jetzt die Applikation noch nicht deployt haben. 
Vielleicht hätten wir hier durch noch bessere Kommunikation das verhindern können, aber ich glaube das liegt eher an dem Problem, dass ich in 1.6 beschreibe.

## 1.4. Was ist uns besonders gut gelungen, worauf sind alle richtig stolz?

Ich finde es toll, dass wir obwohl wir einige Unstimmigkeiten am Anfang des Projektes hatte, alle gut zusammen an einem Strang gezogen haben und sich alle gegenseitig geholfen haben.
Wir sind gut vorangekommen und haben ein cooles Spiel mit einem funktionierenden Backend geschreiben. 
Auch wenn das Deployment noch nicht ganz fehlerfrei durchläuft haben wir gute Arbeit geleistet und wenn wir das Deployment noch zum laufen kriegen haben wir eine feritge Applikation, die ein Game beinhaltet, das Spass macht zu spielen. 
Darauf bin ich und glaube, sind wir alle, stolz.

## 1.5. Was kann ich nun mehr als vorher?

Ich hatte bereits vor dem Modul einige Vorkentnisse mit GitHub Workflows. 
Aber viele Konzepte wie Release Please, Conventional Commits und Terraform kannte ich noch nicht.
Auch wenn ich in diesem Projekt nicht für das Deployment verantwortlich war (ich war eher im Frontend unterwegs) habe ich viel neues dazugelernt. 
Bis jetzt habe ich alle Projekte die ich Deployt habe, immer auf z.B. Vercel oder Render deployt, was sehr einfach ist, aber man ist halt zu jeder Zeit vollständig vom jeweiligen Service abhängig. 
Mit Terraform kann man das Problem umgehen, was ich cool finde.
Ich möchte Terraform auch mal in einem privaten Projekt implementieren. 

## 1.6. Welche Schwierigkeiten gab es?

Die grösste Schwierigkeit lag in unserer ursprünglichen Projektdefinition.
Ich wollte eigentlich ein einfaches Frontend Projekt machen, vor allem, weil ich mich so bei den Teilen, die ich noch nicht so gut kenne, wie Terraform und das Deployment auf AWS, an der Musterlösung orientieren könnte.
Leider waren wir uns im Team nicht einig. Zwei von uns, wollten sehr gerne ein Backend integrieren und meinten auch, dass das vermutlich nicht so kompliziert wäre.
Wir haben dem zugestimmt und uns für das entschieden. 
Nur leider kam so das Problem auf, dass Herr Kunz sich vor allem um das ganze Docker Setup gekümmert hat (weil dort das Frontend und Backend rebundled werden müssen, und er sich sowieso am meisten mit Docker auskennt).
Da das ganze Docker Setup aber so kompliziert war und das meine Verständnisse überstieg, musste er sich dann anschliessend auch um das Deployment kümmern. 
Das ist eigentlich genau das, wovon ich mich zu Beginn gefürchtet habe, dass wir das ganze so verkomplizieren, dass am Ende nur noch eine Person alles richtig versteht und begreifft. 
Hätten wir uns an der Musterlösung orientiert, bin ich mir ziemlich sicher, hätte ich mich mit dem Docker Setup und dem ganzen Deployment besser auseinandersetzen können.

## 1.7. Was ist mir besonders gut gelungen, worauf bin ich richtig stolz?

Ich habe dieses Modul sehr viel gelernt. 
Am wichtigsten war für mich vermutlich, dass wir eine Auffrischung im Thema Docker hatten (ich habe im Docker Modul nicht sehr viel gelernt).
Aber natürlich auch im Thema Terraform und AWS habe ich viel gelernt. 
Ich bin stolz dass wir in dem Modul, obwohl wir zum Teil grössere Schwierigkeiten hatten, ein cooles Projekt erstellt haben mit einem funktionierenden Spiel, das sogar noch Spasst macht zum Spielen!!

## 1.8. Was sollte beibehalten werden?

Wenn wir weiter am Projekt arbeiten, sollten wir auf jeden Fall die Idee des Projektes beibehalten. 
Ein Snake Game ist nicht wahnsinnig kompliziert zu Implementieren und macht trotzdem viel Spass.
Zudem finde ich, wir haben gut und fleissig am Projekt gearbeitet (z.B. wenn man unsere Commit-History anschaut), das würde ich ebenfalls beiebhalten, da so das gemeinsame Arbeiten am meisten Spass macht.

## 1.9. Was würden Sie anders machen?

Wenn ich das Projekt jetzt alleine weiterführen müsste, würde ich vermutlich den Backend-Aspekt entfernen, oder wenn ich ein Backend bräuchte, den ganzen Schritt mit dem Docker Rebundling und Deployment nochmals in Ruhe selbst anschauen, weil dafür bis jetzt nicht wirklich Zeit war. 
Wenn ich das Projekt neu machen müsste, würde ich von Anfang an, ein Projekt erstellen, das möglichst nahe an der Musterlösung ist, damit man sich, wenn man mal nicht weiterkommt an dem orientieren kann.
