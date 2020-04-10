var THREEx	= THREEx	|| {};

THREEx.createGrassTufts	= function(positions){

    // load the texture
    var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/grass01.png';
    var texture	= new THREE.TextureLoader().load(textureUrl);
    // build the material
    var material	= new THREE.MeshPhongMaterial({
        map		: texture,
        color		: 'grey',
        emissive	: 'darkgreen',
        alphaTest	: 0.7,
    });

	// create the initial geometry
	var geometry	= new THREE.PlaneGeometry(1,1);
	// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, geometry.height/2, 0 ) );


	// Tweat the normal for better lighting
	// - normals from http://http.developer.nvidia.com/GPUGems/gpugems_ch07.html
	// - normals inspired from http://simonschreibt.de/gat/airborn-trees/
	geometry.faces.forEach(function(face){
		face.vertexNormals.forEach(function(normal){
			normal.set(0.0,1.0,0.0).normalize()
		})
	});

	// create each tuft and merge their geometry for performance
	var mergedGeo	= new THREE.Geometry();
	for(var i = 0; i < positions.length; i++){
		var position	= positions[i];
		var baseAngle	= Math.PI*2*Math.random();
        let randomScale = (Math.floor(Math.random() * (10 - 5) ) + 5) / 10;

		var nPlanes	= 2;
		for(var j = 0; j < nPlanes; j++){
			var angle	= baseAngle+j*Math.PI/nPlanes;


			// First plane
			var object3d	= new THREE.Mesh(geometry, material);
            object3d.scale.set(randomScale,randomScale,1);
			object3d.rotateY(angle);
			object3d.position.copy(position);
            object3d.position.y = randomScale / 2;
            mergedGeo.mergeMesh( object3d );

			// The other side of the plane
			// - impossible to use ```side : THREE.BothSide``` as
			//   it would mess up the normals
			let object3d2	= new THREE.Mesh(geometry, material);
            object3d2.scale.set(randomScale,randomScale,1);
			object3d2.rotateY(angle+Math.PI);
			object3d2.position.copy(position);
            object3d2.position.y = randomScale / 2;


            mergedGeo.mergeMesh(  object3d2 );
		}
	}

	// create the mesh
    let mesh = new THREE.Mesh(mergedGeo, material);
	mesh.name = "grass";
	return mesh;
};

THREEx.createGrassTufts.baseUrl	= "../";


