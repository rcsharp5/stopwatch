
 function timer(){
	var self = this;
	this.lastTime = "";
	this.runtime = null;
	this.clockElement =null;
	this.resetBtn = null;
	this.startBtn = null;
	this.intervalStatus = false;
	this.interval =null;
	this.lastLap = null;
	this.lastLapElement = null;
	this.lapCount = 0;
	
	this.init = function(){
		this.runtime = 0
		this.clockElement = document.getElementById("clock");
		this.resetBtn = document.getElementById("reset");
		this.startBtn = document.getElementById("startstop");
		this.startBtn.onclick  = self.start
		this.updateClock();
	}
	this.start = function(){
		self.lastTime = new Date().getTime()
		self.runTime =self.lastTime
		self.intervalStatus = true;
		self.updateClock()
		self.startBtn.onclick = self.stop
		
		self.startBtn.innerHTML = "Stop"
		self.startBtn.className="stop"
		self.resetBtn.innerHTML = "Lap"
		self.resetBtn.onclick = self.lap
		self.resetBtn.className = "btnLap"	
		self.startInterval()
	}
	this.lap = function(){
		var currentTime = self.runtime
		var lapDiff
		if(self.lastlap ==null){
			lapDiff= self.formatClock(currentTime)
			self.lastlap = currentTime
		}else{
			lapDiff = self.formatClock(currentTime -self.lastlap )
			self.lastlap = currentTime
		}
		currentTime = self.formatClock(currentTime)
		self.lapCount++
		var lapList = document.getElementById("laplist")
		var lapContainer = document.createElement('div');
		lapContainer.className= "lapcontainer"
		var lapTime = document.createElement('div');
			lapTime.className = "lap"
			lapTime.innerHTML  = self.lapCount
			lapContainer.appendChild(lapTime);
		var lapTime = document.createElement('div');
			lapTime.className = "lap"
			lapTime.innerHTML  = currentTime
			lapContainer.appendChild(lapTime);
		var lapTime = document.createElement('div');
			lapTime.className = "lap"
			lapTime.innerHTML  = lapDiff
			lapContainer.appendChild(lapTime);
			lapList.insertBefore(lapContainer,self.lastLapElement)
			self.lastLapElement = lapContainer
	}
	this.startInterval = function(){
		self.interval = window.setInterval(function () {
			self.runInterval()
			}, 50);
	}
	this.stopInterval = function(){
		 clearInterval(self.interval);
	}
	this.resume = function(){
		self.lastTime =new Date().getTime();
		self.intervalStatus = true;
		self.startBtn.onclick = self.stop
		self.startBtn.innerHTML = "Stop"
		self.resetBtn.innerHTML = "Lap"
		self.startBtn.className="stop"
		self.resetBtn.className = "btnLap"
		self.resetBtn.onclick = self.lap
		self.startInterval()
		self.updateClock()
	}
	this.formatClock = function(pTime){
		var lTime ;
		if(pTime == null){
			lTime  = "00:00:00.00";
		}else{
			var hours =Math.floor(pTime/3600000)
			var min = Math.floor((pTime-(hours*3600000))/60000)
			var sec = (pTime-(hours*3600000)-(min * 60000))/1000
			sec = sec.toFixed(2)
			hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
			min = (min < 10) ? '0' + min.toString() : min.toString();
			sec = (sec < 10) ? '0' + sec.toString() : sec.toString();
			
			lTime = hours + ":" + min + ":" + sec
		}
		return lTime;
	}
	this.stop = function(){
		self.lastTime =new Date().getTime();
		self.intervalStatus = false;
		self.startBtn.onclick = self.resume
		self.startBtn.innerHTML = "Resume"
		self.startBtn.className="resume"
		self.resetBtn.innerHTML ="Reset"
		self.resetBtn.className = "reset"
		self.resetBtn.onclick =self.reset
		self.stopInterval()
	}
	this.reset = function(){
		self.intervalStatus = false;
		self.lastTime =new Date().getTime();
		self.startBtn.onclick = self.start
		self.startBtn.innerHTML = "Start"
		self.startBtn.className="start"
		self.resetBtn.className = "btnOff"
		self.runtime = 0
		self.updateClock();
		var lapList = document.getElementById("laplist")
		self.lastLap = null;
		self.lastLapElement = null;
		self.lapCount = 0;
		while (lapList.firstChild) {
			lapList.removeChild(lapList.firstChild);
		}
	}
	this.updateClock = function(){
		self.clockElement.innerHTML = self.formatClock(self.runtime);
	}

	this.runInterval = function(){

		if(this.intervalStatus===true){
			var lTime = new Date().getTime();
			
			self.runtime = (lTime-self.lastTime) +self.runtime
			self.lastTime = lTime
			self.updateClock()
		}else{
			//break out of interval
			self.stopInterval()
		}
	}
 }

var timer = new timer()