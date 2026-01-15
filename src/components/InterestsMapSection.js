import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as d3 from 'd3';
import { interests as interestsData } from '../data/interests';

function InterestsMapSection({ mode }) {
  const svgRef = useRef(null);
  
  // Use interests data with avatar
  const interests = {
    ...interestsData,
    avatar: `${process.env.PUBLIC_URL}/images/Interest%20Map/profile.PNG`
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 800;
    
    // Calculate base dimensions and scale
    const baseSize = Math.min(width, height);
    const scale = 1;
    const labelScale = 1;
    
    // Define level distances proportionally
    const levelDistances = [
      0,                          // Level 0 (center)
      baseSize * 0.10 * scale,   // Level 1 (categories)
      baseSize * 0.35 * scale    // Level 2 (subcategories)
    ];
    
    const avatarSize = 100;
    const collisionRadius = 42 * scale;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Flatten hierarchical data into nodes and links
    const nodes = [];
    const links = [];
    let nodeId = 0;

    // Add center node
    nodes.push({
      id: 'center',
      name: interests.name,
      isCenter: true,
      r: avatarSize / 2,
      level: 0
    });

    // Add category and subcategory nodes
    interests.children.forEach((category, catIdx) => {
      const categoryId = `cat-${nodeId++}`;
      
      // Add category node
      nodes.push({
        id: categoryId,
        name: category.name,
        color: category.color,
        r: 2,
        level: 1
      });

      // Link category to center
      links.push({
        source: 'center',
        target: categoryId,
        color: category.color
      });

      // Add subcategory nodes
      if (category.children) {
        category.children.forEach((subcat) => {
          const subcatId = `sub-${nodeId++}`;
          
          nodes.push({
            id: subcatId,
            name: subcat.name,
            color: category.color,
            r: 2,
            level: 2
          });

          // Link subcategory to category
          links.push({
            source: categoryId,
            target: subcatId,
            color: category.color
          });
        });
      }
    });

    // Set initial positions and random offsets
    nodes.forEach(node => {
      if (node.isCenter) {
        node.x = width / 2;
        node.y = height / 2;
        node.fx = width / 2;
        node.fy = height / 2;
      } else {
        // Add random initial positions for organic spread
        const angle = Math.random() * 2 * Math.PI;
        const radiusVariation = (Math.random() - 0.5) * 120;
        const radius = levelDistances[node.level] + radiusVariation;
        node.x = width / 2 + Math.cos(angle) * radius;
        node.y = height / 2 + Math.sin(angle) * radius;
        
        // Store random radial offset for subcategories
        if (node.level === 2) {
          node.radialOffset = (Math.random() - 0.5) * 100;
        }
      }
    });

    // Store random distances for each link (to keep them consistent)
    links.forEach(link => {
      if (typeof link.source !== 'string' && link.source.level === 1) {
        link.randomDistance = 50 + Math.random() * 80; // 50-130px
        link.randomStrength = 0.7 + Math.random() * 0.3; // 0.7-1.0
      }
    });

    // Create force simulation with clustering behavior
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(d => {
          // Center to category: spread categories around the center
          if (d.source.level === 0 && d.target.level === 1) {
            return levelDistances[1];
          }
          // Category to subcategory: variable distance for asymmetry
          if (d.source.level === 1 && d.target.level === 2) {
            return d.randomDistance || 65;
          }
          return 100;
        })
        .strength(d => {
          // Variable strength for more organic clustering
          if (d.source.level === 1 && d.target.level === 2) {
            return d.randomStrength || 0.85;
          }
          return 0.7;
        })
      )
      .force('charge', d3.forceManyBody()
        .strength(d => {
          if (d.isCenter) return 0;
          if (d.level === 1) return -350; // Categories repel each other strongly
          return -80; // Subcategories have weaker repulsion for tighter clusters
        })
        .distanceMax(250)
      )
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force('collision', d3.forceCollide()
        .radius(d => d.r + 35)
        .strength(0.85)
      )
      .force('radial', d3.forceRadial(
        d => {
          if (d.level === 1) return levelDistances[1]; // Categories on inner ring
          if (d.level === 2) {
            // Variable radius for subcategories to create asymmetry
            return levelDistances[2] + (d.radialOffset || 0);
          }
          return 0;
        },
        width / 2,
        height / 2
      ).strength(d => d.isCenter ? 0 : 0.25))
      .velocityDecay(0.6)
      .alphaDecay(0.02);

    const svg = d3.select(svgRef.current);

    // Add orbital rings using fixed distances
    const orbitalRings = svg.append('g').attr('class', 'orbital-rings');
    
    const ringColor = mode === 'light' ? '#D0D0D0' : '#ffffff';
    
    // Center ring (around avatar)
    orbitalRings.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', avatarSize / 2)
      .attr('fill', 'none')
      .attr('stroke', ringColor)
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);
    
    // Create subsequent rings at 200px, 300px, 400px, 500px
    [125, 200, 275].forEach(radius => {
      orbitalRings.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', ringColor)
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);
    });

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => d.color || '#d0d0d0')
      .attr('stroke-width', 1)
      .attr('opacity', 0.6);

    // Create nodes group
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g');
    
    // Apply drag only to non-center nodes
    node.filter(d => !d.isCenter)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for non-center nodes
    node.filter(d => !d.isCenter)
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.color)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).transition().duration(200).attr('r', d.r * 1.3);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).transition().duration(200).attr('r', d.r);
      });

    // Add profile image for center node
    const defs = svg.append('defs');
    defs.append('clipPath')
      .attr('id', 'circle-clip')
      .append('circle')
      .attr('r', (avatarSize * 1.15) / 2);

    const centerNode = node.filter(d => d.isCenter);
    
    centerNode.append('image')
      .attr('xlink:href', process.env.PUBLIC_URL + '/images/Interest Map/profile.PNG')
      .attr('width', avatarSize)
      .attr('height', avatarSize)
      .attr('x', -avatarSize / 2)
      .attr('y', -avatarSize / 2)
      .attr('clip-path', 'url(#circle-clip)')
      .style('cursor', 'pointer')
      .style('transition', 'transform 0.3s ease')
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('width', avatarSize * 1.15)
          .attr('height', avatarSize * 1.15)
          .attr('x', -(avatarSize * 1.15) / 2)
          .attr('y', -(avatarSize * 1.15) / 2);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('width', avatarSize)
          .attr('height', avatarSize)
          .attr('x', -avatarSize / 2)
          .attr('y', -avatarSize / 2);
      });

    centerNode.append('circle')
      .attr('r', avatarSize / 2)
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('stroke-width', 0);

    const labelColor = mode === 'light' ? '#666666' : '#ffffff';
    
    // Add labels for categories
    node.filter(d => d.level === 1)
      .append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.r + 18)
      .attr('font-size', '12px')
      .attr('font-weight', 300)
      .attr('font-family', 'Inter, sans-serif')
      .attr('fill', labelColor)
      .style('pointer-events', 'none');

    // Add labels for subcategories
    node.filter(d => d.level === 2)
      .append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.r + 16)
      .attr('font-size', '10px')
      .attr('font-weight', 300)
      .attr('font-family', 'Inter, sans-serif')
      .attr('fill', labelColor)
      .style('pointer-events', 'none');

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <Box
      id="interests"
      sx={{
        backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000',
        color: mode === 'light' ? '#666666' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 0, md: 0 },
        py: { xs: 0, md: 0 }
      }}
    >
      <Box sx={{ maxWidth: 1200, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, mb: 0 }}>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: mode === 'light' ? '#999999' : '#ffffff', whiteSpace: 'nowrap' }}>
            Interests
          </Typography>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: mode === 'light' ? '#d0d0d0' : '#ffffff' }} />
        </Box>
        
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 0 }}>
          <svg
            ref={svgRef}
            width="1000"
            height="1000"
            viewBox="0 0 800 800"
            style={{ maxWidth: '100%', height: 'auto', backgroundColor: mode === 'light' ? '#F1F1F1' : '#000000' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default InterestsMapSection;

