users
  - id (SOME-PUSH-ID-STUDENTID)
    - email (tylermcginnis33@gmail.com)
    - name (Tyler McGinnis)
    - classes
      - classid (SOME-PUSH-ID-CLASSID)
        - name (Pysics)
        - isTeacher (true)
        - isMentor (false)
        - isStudent (false)

classes
  - id (SOME-PUSH-ID-CLASSID)
    - name (Physics)
    - mentors
      - mentorid (SOME-PUSH-ID-STUDENTID)
    - students
      - studentid (SOME-PUSH-ID-STUDENTID)
        - name (Tyler McGinnis)
        - email (tylermcginnis33@gmail.com)

queue
  - classid (SOME-PUSH-ID-CLASSID)
    - student in queue (XEGS#SEGE)
      - time entered (10139443)
      - name || anonymous (Tyler McGinnis)
      - question (Can you chain promises?)

studentStatus
  - classid (SOME-PUSH-ID-CLASSID)
    - studentid (SOME-PUSH-ID-STUDENTID)
      - status (84)