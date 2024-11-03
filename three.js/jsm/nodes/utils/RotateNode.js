import TempNode from '../core/TempNode.js';
import { addNodeClass } from '../core/Node.js';
import {
	addNodeElement,
	nodeProxy,
	vec4,
	mat4,
} from '../shadernode/ShaderNode.js';
import { cos, sin } from '../math/MathNode.js';

class RotateNode extends TempNode {

	constructor( positionNode, rotationNode ) {

		super( 'vec3' );

		this.positionNode = positionNode;
		this.rotationNode = rotationNode;

	}

	setup() {

		const { rotationNode, positionNode } = this;

		const rotation = rotationNode;
		const rotationXMatrix = mat4( vec4( 1.0, 0.0, 0.0, 0.0 ), vec4( 0.0, cos( rotation.x ), sin( rotation.x ).negate(), 0.0 ), vec4( 0.0, sin( rotation.x ), cos( rotation.x ), 0.0 ), vec4( 0.0, 0.0, 0.0, 1.0 ) );
		const rotationYMatrix = mat4( vec4( cos( rotation.y ), 0.0, sin( rotation.y ), 0.0 ), vec4( 0.0, 1.0, 0.0, 0.0 ), vec4( sin( rotation.y ).negate(), 0.0, cos( rotation.y ), 0.0 ), vec4( 0.0, 0.0, 0.0, 1.0 ) );
		const rotationZMatrix = mat4( vec4( cos( rotation.z ), sin( rotation.z ).negate(), 0.0, 0.0 ), vec4( sin( rotation.z ), cos( rotation.z ), 0.0, 0.0 ), vec4( 0.0, 0.0, 1.0, 0.0 ), vec4( 0.0, 0.0, 0.0, 1.0 ) );

		return rotationXMatrix.mul( rotationYMatrix ).mul( rotationZMatrix ).mul( vec4( positionNode, 1.0 ) ).xyz;

	}

}

export default RotateNode;

export const rotate = nodeProxy( RotateNode );

addNodeElement( 'rotate', rotate );

addNodeClass( 'RotateNode', RotateNode );
