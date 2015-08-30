/*eslint-disable */
/* Javascript written by Jaap Scherphuis,  jaapsch a t yahoo d o t com */

// Default settings
var size=3;
var seqlen=30;
var numcub=5;
var mult=false;
var cubeorient=false;

var seq=new Array();	// move sequences

// append set of moves along an axis to current sequence in order
function appendmoves( sq, axsl, tl, la ){
	for( var sl=0; sl<tl; sl++){	// for each move type
		if( axsl[sl] ){				// if it occurs
			var q=axsl[sl]-1;

			// get semi-axis of this move
			var sa = la;
			var m = sl;
			if(sl+sl+1>=tl){ // if on rear half of this axis
				sa+=3; // get semi-axis (i.e. face of the move)
				m=tl-1-m; // slice number counting from that face
				q=2-q; // opposite direction when looking at that face
			}
			// store move
			sq[sq.length]=(m*6+sa)*4+q;
		}
	}
}

// generate sequence of scambles
function scramble(){
	//tl=number of allowed moves (twistable layers) on axis -- middle layer ignored
	var tl=size;
	if(mult || (size&1)!=0 ) tl--;
	//set up bookkeeping
	var axsl=new Array(tl);    // movement of each slice/movetype on this axis
	var axam=new Array(0,0,0); // number of slices moved each amount
	var la; // last axis moved

	// for each cube scramble
	for(var n=0; n<numcub; n++){
		// initialise this scramble
		la=-1;
		seq[n]=new Array(); // moves generated so far
		// reset slice/direction counters
		for( var i=0; i<tl; i++) axsl[i]=0;
		axam[0]=axam[1]=axam[2]=0;
		var moved = 0;

		// while generated sequence not long enough
		while( seq[n].length + moved <seqlen ){

			var ax, sl, q;
			do{
				do{
					// choose a random axis
					ax=Math.floor(Math.random()*3);
					// choose a random move type on that axis
					sl=Math.floor(Math.random()*tl);
					// choose random amount
					q=Math.floor(Math.random()*3);
				}while( ax==la && axsl[sl]!=0 );		// loop until have found an unused movetype
			}while( ax==la					// loop while move is reducible: reductions only if on same axis as previous moves
					&& !mult				// multislice moves have no reductions so always ok
					&& tl==size				// only even-sized cubes have reductions (odds have middle layer as reference)
					&& (
						2*axam[0]==tl ||	// reduction if already have half the slices move in same direction
						2*axam[1]==tl ||
						2*axam[2]==tl ||
						(
							2*(axam[q]+1)==tl	// reduction if move makes exactly half the slices moved in same direction and
							&&
							axam[0]+axam[1]+axam[2]-axam[q] > 0 // some other slice also moved
						)
				    )
			);

			// if now on different axis, dump cached moves from old axis
			if( ax!=la ) {
				appendmoves( seq[n], axsl, tl, la );
				// reset slice/direction counters
				for( var i=0; i<tl; i++) axsl[i]=0;
				axam[0]=axam[1]=axam[2]=0;
				moved = 0;
				// remember new axis
				la=ax;
			}

			// adjust counters for this move
			axam[q]++;// adjust direction count
			moved++;
			axsl[sl]=q+1;// mark the slice has moved amount

		}
		// dump the last few moves
		appendmoves( seq[n], axsl, tl, la );

		// do a random cube orientation if necessary
		seq[n][seq[n].length]= cubeorient ? Math.floor(Math.random()*24) : 0;
	}

	// build lookup table
	var flat2posit=new Array(12*size*size);
	for(i=0; i<flat2posit.length; i++) flat2posit[i]=-1;
	for(i=0; i<size; i++){
		for(var j=0; j<size; j++){
			flat2posit[4*size*(3*size-i-1)+  size+j  ]=        i *size+j;	//D
			flat2posit[4*size*(  size+i  )+  size-j-1]=(  size+i)*size+j;	//L
			flat2posit[4*size*(  size+i  )+4*size-j-1]=(2*size+i)*size+j;	//B
			flat2posit[4*size*(       i  )+  size+j  ]=(3*size+i)*size+j;	//U
			flat2posit[4*size*(  size+i  )+2*size+j  ]=(4*size+i)*size+j;	//R
			flat2posit[4*size*(  size+i  )+  size+j  ]=(5*size+i)*size+j;	//F
		}
	}
}

function scramblestring(n){
	var s="",j;
	for(var i=0; i<seq[n].length-1; i++){
		if( i!=0 ) s+=" ";
		var k=seq[n][i]>>2;

		j=k%6; k=(k-j)/6;
		if( k && size<=5 && !mult ) {
			s+="dlburf".charAt(j);	// use lower case only for inner slices on 4x4x4 or 5x5x5
		}else{
			if(size<=5 && mult ){
				s+="DLBURF".charAt(j);
				if(k) s+="w";	// use w only for double layers on 4x4x4 and 5x5x5
			}
			else{
				if(k)	s+=(k+1);
				s+="DLBURF".charAt(j);
			}
		}

		j=seq[n][i]&3;
		if(j!=0) s+=" 2'".charAt(j);
	}

	// add cube orientation
	if( cubeorient ){
		var ori = seq[n][seq[n].length-1];
		s="Top:"+colorList[ 2+colors[colorPerm[ori][3]] ]
			+"&nbsp;&nbsp;&nbsp;Front:"+colorList[2+ colors[colorPerm[ori][5]] ]+"<br>"+s;
	}
	return s;
}

var _scrambleCount = numcub;

function getScrambleString(){
	if (_scrambleCount == numcub) {
  	scramble();
		_scrambleCount = 0;
	}
  return scramblestring(_scrambleCount++);
}

module.exports = getScrambleString;
/*eslint-enable */
