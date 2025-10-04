set val(chan)           	Channel/WirelessChannel
set val(prop)           	Propagation/TwoRayGround
set val(netif)          	Phy/WirelessPhy
set val(mac)            	Mac/802_11
set val(ifq)            	Queue/DropTail/PriQueue   
set val(ll)             	LL
set val(ant)            	Antenna/OmniAntenna       
set val(ifqlen)  	      	50
set val(nn)             	6
set val(rp)          	  	AODV
set val(x)			250
set val(y)			250

set ns [new Simulator]
$ns use-newtrace
set traceFile [open new.tr w]
$ns trace-all $traceFile
set namFile [open new.nam w]
$ns namtrace-all-wireless $namFile $val(x) $val(y)

set topo [new Topography]
$topo load_flatgrid $val(x) $val(y)
create-god $val(nn);    # :P
set chan_ [new $val(chan)]

$ns node-config -adhocRouting $val(rp) -llType $val(ll) \
		-macType $val(mac)  -ifqType $val(ifq)  \
		-ifqLen $val(ifqlen) -antType $val(ant) \
		-propType $val(prop) -phyType $val(netif) \
		-topoInstance $topo a-agentTrace ON -routerTrace ON \
		-macTrace ON -movementTrace ON -channel $chan_ 

for {set i 0} {$i < $val(nn)} {incr i} {
    set n($i) [$ns node]
    $n($i) random-motion 0
    #$n($i) start
}

$n(0) set X_ 20.0
$n(0) set Y_ 100.0
$n(0) set Z_ 0.0

$n(1) set X_ 120.0
$n(1) set Y_ 100.0
$n(1) set Z_ 0.0

$n(2) set X_ 100.0
$n(2) set Y_ 100.0
$n(2) set Z_ 0.0

$n(3) set X_ 150.0
$n(3) set Y_ 100.0
$n(3) set Z_ 0.0

$n(4) set X_ 180.0
$n(4) set Y_ 150.0
$n(4) set Z_ 0.0

$n(5) set X_ 200.0
$n(5) set Y_ 100.0
$n(5) set Z_ 0.0

$ns at 0.0 "$n(0) setdest [$n(0) set X_] [$n(0) set Y_] 0.0"
$ns at 0.0 "$n(1) setdest [$n(1) set X_] [$n(1) set Y_] 0.0"
$ns at 0.0 "$n(2) setdest [$n(2) set X_] [$n(2) set Y_] 0.0"
$ns at 0.0 "$n(3) setdest [$n(3) set X_] [$n(3) set Y_] 0.0"
$ns at 0.0 "$n(4) setdest [$n(4) set X_] [$n(4) set Y_] 0.0"
$ns at 0.0 "$n(5) setdest [$n(5) set X_] [$n(5) set Y_] 0.0"

set tcp0 [new Agent/TCP]
set sink0 [new Agent/TCPSink]
$ns attach-agent $n(0) $tcp0
$ns attach-agent $n(5) $sink0
$ns connect $tcp0 $sink0
set ftp0 [new Application/FTP]
$ftp0 attach-agent $tcp0

set tcp1 [new Agent/TCP]
set sink1 [new Agent/TCPSink]
$ns attach-agent $n(2) $tcp1
$ns attach-agent $n(1) $sink1
$ns connect $tcp1 $sink1
set ftp1 [new Application/FTP]
$ftp1 attach-agent $tcp1

set tcp2 [new Agent/TCP]
set sink1 [new Agent/TCPSink]
$ns attach-agent $n(3) $tcp2
$ns attach-agent $n(1) $sink1
$ns connect $tcp2 $sink1
set ftp2 [new Application/FTP]
$ftp2 attach-agent $tcp2

proc stop {} {
    global ns traceFile namFile
    $ns flush-trace
    close $traceFile; 
    close $namFile
    exit 0
}

$ns at 0.0 "$ftp0 start" 
$ns at 4.0 "$ftp0 stop"
$ns at 0.5 "$ftp1 start" 
$ns at 3.0 "$ftp1 stop"
$ns at 1.0 "$ftp2 start" 
$ns at 3.5 "$ftp2 stop"
$ns at 10.0 "stop"
$ns run
