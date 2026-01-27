 const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let angleX = 0;
    let angleY = 0;

    // Icosahedron constants
    const phi = (1 + Math.sqrt(5)) / 2; // The Golden Ratio
    const scale = 230; // Size of the icon

    // 1. Define the 12 vertices of an icosahedron
    const vertices = [
        [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
        [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
        [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];

    // 2. Determine edges by distance (connect vertices that are exactly 2 units apart)
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i][0] - vertices[j][0];
            const dy = vertices[i][1] - vertices[j][1];
            const dz = vertices[i][2] - vertices[j][2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (Math.abs(dist - 2) < 0.1) {
                edges.push([i, j]);
            }
        }
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function rotate(vertex, ax, ay) {
        let [x, y, z] = vertex;

        // Rotate around Y axis
        let cosY = Math.cos(ay), sinY = Math.sin(ay);
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Rotate around X axis
        let cosX = Math.cos(ax), sinX = Math.sin(ax);
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        return [x1, y2, z2];
    }

    function project(vertex) {
        // Simple orthographic projection
        return {
            x: width / 2 + vertex[0] * scale,
            y: height / 2 + vertex[1] * scale
        };
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Update rotation
        angleX += 0.01;
        angleY += 0.015;

        const projectedVertices = vertices.map(v => {
            const rotated = rotate(v, angleX, angleY);
            return project(rotated);
        });

        // Draw Edges
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';

        edges.forEach(edge => {
            const v1 = projectedVertices[edge[0]];
            const v2 = projectedVertices[edge[1]];
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
        });

        ctx.stroke();
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();