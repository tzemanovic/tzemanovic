---
title: Linux Mint in Windows 8 via VMware Player
tags: linux, windows 8, linux mint 16, vmware player
published: 2014-03-29
---

For a while I have been trying to emulate the *nix terminal in Windows 8 using cygwin, but I wanted to get the full experience, so I decided to run Linux Mint in VMware Player. The setup instructions follow.

First of all you need to disable Hyper-V to be able to install VMware Player. To do that run the following command from an elevated command prompt:

<pre><code class="bash">dism.exe /Online /Disable-Feature:Microsoft-Hyper-V</code></pre>

In case you need to enable Hyper-V again, the following undoes the changes:

<pre><code class="bash">dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All</code></pre>

Next, install and run <a href="https://my.vmware.com/web/vmware/free" target="_blank">VMware Player</a>.

1. Create a new virtual machine:

	<img src="step-1.jpg" alt="step 1"/>

1. Select location of the Linux image, I went for <a href="http://www.linuxmint.com/download.php" target="_blank">Linux Mint 16 Cinnamon 64-bit</a>:

	<img src="step-2.jpg" alt="step 2"/>

1. The version is Linux 3.x kernel 64-bit:

	<img src="step-3.jpg" alt="step 3"/>

1. Select where you want to store the virtual machine:

	<img src="step-4.jpg" alt="step 4"/>

1. Give it appropriate disk capacity, I gave mine only 8GB at fist, but ran out of it quite quickly (if you resize the capacity later on you will most-likely have to do some disk partitioning):

	<img src="step-5.jpg" alt="step 5"/>

1. Before you finish you will want to customize hardware:

	<img src="step-6.jpg" alt="step 6"/>

1. Select how much memory you want to use for your VM:

	<img src="step-7.jpg" alt="step 7"/>

1. Enable 3D graphics acceleration from the Display settings:

	<img src="step-8.jpg" alt="step 8"/>
	
	And that's you ready to roll in Linux.
	
My screen resolution (1920x1080) was not listed in the display settings, here's how I fixed it.

1. Calculate VESA CVT mode lines:

	<pre><code class="bash">cvt 1920 1080</code></pre>

1. Copy the output starting from after Modeline, and prepend it with <code>xrandr --newmode</code>, e.g.:

	<pre><code class="bash">xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync</code></pre>
	
1. and then: 

	<pre><code class="bash">xrandr --addmode Virtual1 "1920x1080_60.00"</code></pre>

1. Switch to console mode using <kbd>Alt</kbd>+<kbd>Ctrl</kbd>+<kbd>F1</kbd> and log in.

1. Stop Display Manager:

	<pre><code class="bash">sudo service mdm stop</code></pre>

1. create X configuration file:

	<pre><code class="bash">sudo X -configure</code></pre>

1. and start it again:

	<pre><code class="bash">sudo service mdm start</code></pre>

1. Switch to back to the desktop mode using <kbd>Alt</kbd>+<kbd>Ctrl</kbd>+<kbd>F7</kbd>.
