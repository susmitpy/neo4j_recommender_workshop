# Neo4j Recommender Workshop

## About Me

### Susmit Vengurlekar

### Data Scientist, Backend Developer, AWS Solutions Architect, Neo4j Professional

- Data Scientist at AIDAX
- Certified Neo4j Professional
- Programming Experience of **8+ years**, Corporate Experience of **4+ years** 
- HSC Commerce & Bsc IT from DG Ruparel College, Mumbai

## Let's Cover the Basics first

### What is a Knowledge Graph?

- A Knowledge Graph is a graph database that stores information in the form of nodes and edges
- Nodes represent entities and edges represent relationships between entities
- Properties can be attached to nodes and edges

#### Example

```mermaid
graph LR
    P[("Person {Name: 'Susmit'}")]
    PL[("Programming Language {Name: 'Python'}")]
    
    P -->|"Knows {Since: 2016}"| PL
```


### Intro to Neo4j

- Graph database
- Labels, Nodes, Relationships, and Properties
- Native Graph Storage: Store data using pointers on disk
- Cypher Query Language
- Create only directed relationships, but traverse them any way.

<img src="./public/neo_intro.jpeg" class="w-3/4" style="background:white"/>

### Intro to Neo4j - Cypher Query Language

#### To find all actors who acted in the movie "The Matrix"


#### Instead of this
```sql
SELECT actors.name
FROM actors
 	LEFT JOIN acted_in ON acted_in.actor_id = actors.id
	LEFT JOIN movies ON movies.id = acted_in.movie_id
WHERE movies.title = "The Matrix"
```

### You can write this
```cypher
MATCH (actor:Actor)-[:ACTED_IN]->(movie:Movie {title: 'The Matrix'})
RETURN actor.name
```


## Enough Talk, Time to Get our Hands Dirty!
1. Spin up neo4j sandbox by going to <a href="https://sandbox.neo4j.com" target="_blank">sandbox.neo4j.com</a>

2. Login with Email ID and Password (if you use social login, don't forget to signout after the session)

3. Choose "Graph Data Science" from the "Featured Dataset" section

4. Open Neo4j Browser (it opens in a new tab)

5. Click on authentication type and choose "Username and Password"

6. You can find the password in the "Connection Details" section on the sandbox page 

7. Your first step is to delete the existing data. Run the following command in the query editor
```cypher
MATCH (n) DETACH DELETE n;
```


## Want to practice more at home?

You have a couple of options:
1. Use Neo4j Sandbox - <a href="https://sandbox.neo4j.com" target="_blank">sandbox.neo4j.com</a>
2. Aura DB - <a href="https://neo4j.com/product/auradb/" target="_blank">AuraDB</a>
3. Aura Graph Analytics - <a href="https://neo4j.com/product/aura-graph-analytics/" target="_blank">Aura Graph Analytics</a> 
4. Neo4j Desktop Application - <a href="https://neo4j.com/deployment-center/" target="_blank">Download Here</a>
5. Local Setup using Docker Compose (instructions below)

## Local Setup for hands-on practice
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/susmitpy/neo4j_recommender_workshop.git
   cd neo4j_recommender_workshop
    ```

2. **Use Docker Compose to Start Neo4j**  
   Ensure you have Docker and Docker Compose installed. Then run:
   ```bash
   docker-compose up -d
   ```

3. **Access Neo4j Browser**
    Open your web browser and navigate to `http://localhost:7474`. Use the following credentials to log in:
    - Username: `neo4j`
    - Password: `test1234`

## Learning Resources

- Neo4j Official Documentation - [Neo4j Docs](https://neo4j.com/docs/)

- Neo4j Courses @ Graph Academy - [Graph Academy](https://graphacademy.neo4j.com/categories/)

- Neo4j Cypher Refcard - [Cypher Refcard](https://neo4j.com/docs/cypher-refcard/current/)

- Certifications - [Neo4j Certifications](https://graphacademy.neo4j.com/certifications/)
    - Neo4j Certified Professional
    - Neo4j Graph Data Science Certification

- Neo4j Developer Blog on Medium - [Neo4j Developer Blog](https://medium.com/neo4j)

- My session of QnA on Neo4j Knowledge Graph at Graph Database Mumbai Meetup - [Watch Here](https://youtu.be/JpysxH4Z5Fw)

## Wait! What about AI ? 
- Knowledge Graphs are being used to enhance AI models by providing structured context and relationships between data points.
- Neo4j supports vector embeddings and similarity searches, making it easier to integrate with AI applications.
3. LLM Graph Builder - [Neo4j LLM Graph Builder](https://neo4j.com/labs/genai-ecosystem/llm-graph-builder/) is a tool that helps in building knowledge graphs using large language models (LLMs).
4. Don't forget, Data Science is also a key aspect of AI! Neo4j's Graph Data Science Library provides powerful algorithms for graph analytics and machine learning.
