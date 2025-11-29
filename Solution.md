# Workshop Solutions

## 5. Basic Recommendations (Cypher)

### Rec Engine 0: Popularity (The "Trending" List)
**Exercise:** Find the top 10 most rated movies.

```cypher
MATCH (m:Movie)<-[:RATED]-(u) 
RETURN m.title, count(u) as reviews 
ORDER BY reviews DESC 
LIMIT 10;
```

### Rec Engine 1: Content-Based Filtering
**Exercise:** Find movies that share genres with "Toy Story (1995)".

```cypher
MATCH (m:Movie {title: "Toy Story (1995)"})-[:IN_GENRE]->(g:Genre)
MATCH (rec:Movie)-[:IN_GENRE]->(g)
WHERE rec <> m // Don't recommend the movie itself
RETURN rec.title, collect(g.name) as sharedGenres, count(g) as overlap
ORDER BY overlap DESC
LIMIT 10;
```

### Rec Engine 2: Collaborative Filtering
**Exercise:** Find movies recommended by peers who also liked "Toy Story".

```cypher
// 1. Find Toy Story
MATCH (m:Movie {title: "Toy Story (1995)"})
// 2. Find users who liked it (Rating > 3)
MATCH (m)<-[r1:RATED]-(u:User) WHERE r1.rating > 3
// 3. Find other movies those users liked
MATCH (u)-[r2:RATED]->(rec:Movie) WHERE r2.rating > 3 AND rec <> m
// 5. Rank by frequency
RETURN rec.title, count(u) as frequent_recommendation
ORDER BY frequent_recommendation DESC
LIMIT 10;
```

## 6. Graph Data Science (GDS)

### Step C.1: Create the Projection

```cypher
CALL gds.graph.drop('myGraph', false);
CALL gds.graph.project(
  'myGraph',                // Name of graph in memory
  ['User', 'Movie'],        // Nodes to load
  {
    RATED: {orientation: 'UNDIRECTED'} // Treat rating as a two-way street
  }
);
```

### Step C.2: Run Node Similarity

```cypher
CALL gds.nodeSimilarity.stream('myGraph')
YIELD node1, node2, similarity
WHERE similarity > 0.1  // Only show strong matches
RETURN gds.util.asNode(node1).title AS Movie_A,
       gds.util.asNode(node2).title AS Movie_B,
       similarity
ORDER BY similarity DESC
LIMIT 10;
```

### Step C.3: The "Hybrid" Recommendation
**Scenario:** I just watched **"Inception"**. What should I watch next?

```cypher
MATCH (m:Movie {title: "Inception (2010)"})
CALL gds.nodeSimilarity.stream('myGraph')
YIELD node1, node2, similarity
WHERE gds.util.asNode(node1) = m AND similarity > 0.1
RETURN gds.util.asNode(node2).title AS Recommendation, similarity
ORDER BY similarity DESC
LIMIT 5;
```
