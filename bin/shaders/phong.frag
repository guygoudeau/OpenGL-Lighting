// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;
out vec4 fragColor;

uniform vec3 lightDirection;
uniform vec3 cameraPosition;
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
uniform float specularPower;

void main()
{ 
	vec3 N = normalize(vNormal.xyz); 
	vec3 Lm = normalize(lightDirection);
	vec3 V = normalize(cameraPosition - vPosition.xyz);
	vec3 Rm = 2 * dot(N, Lm) * N - Lm;

	vec3 Red = vec3(250, 0, 0);
	vec3 Green = vec3(0, 250, 0);
	vec3 Blue = vec3(0, 0, 250);

	float a = dot(N,vec3(0,1.f,0));
	vec3 hemisphere = 0.5f + (.5f * mix(Blue,Green,a));
	float lambertTerm = max(0, dot(N, Lm));
	float specularTerm = pow(max(0, dot( Rm, V)), specularPower);

	vec3 ambient =  Ka * (Ia * .01f) * hemisphere;
    vec3 diffuse = Kd * Id * lambertTerm;
    vec3 specular = Ks * Is * specularTerm;
    
    fragColor = vec4( ambient + diffuse + specular, 1);
}