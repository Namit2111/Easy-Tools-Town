'use client';

import React, { useState, useRef, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';

// Video Deduplicator Tool
export const VideoDeduplicatorTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    stripMetadata: true,
    tiltAngle: 0.5, // degrees
    zoomLevel: 1.02, // 2% zoom
    filter: 'brightness', // brightness, contrast, saturation, sepia
    filterIntensity: 0.1, // 10% intensity
    customTilt: 0.5,
    customZoom: 1.02,
    customFilterIntensity: 0.1
  });
  const [showCustomSettings, setShowCustomSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      if (newFile.type.startsWith('video/')) {
        setFile(newFile);
        setResultUrl(null);
        
        // Create preview URL for the video
        if (videoUrl) {
          URL.revokeObjectURL(videoUrl);
        }
        const newVideoUrl = URL.createObjectURL(newFile);
        setVideoUrl(newVideoUrl);
      } else {
        alert('Please select a valid video file');
      }
    }
  };

  const processVideo = async () => {
    if (!file || !videoRef.current) return;
    
    setProcessing(true);
    
    try {
      // Create a new video element with the same transformations as preview
      const processedVideo = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Load video
      processedVideo.src = videoUrl || URL.createObjectURL(file);
      processedVideo.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        processedVideo.onloadedmetadata = resolve;
        processedVideo.onerror = reject;
      });

      // Get current settings
      const zoomLevel = showCustomSettings ? settings.customZoom : settings.zoomLevel;
      const tiltAngle = (showCustomSettings ? settings.customTilt : settings.tiltAngle) * Math.PI / 180;
      const filterIntensity = showCustomSettings ? settings.customFilterIntensity : settings.filterIntensity;

      // Set canvas dimensions - keep original aspect ratio but account for zoom and rotation
      const originalWidth = processedVideo.videoWidth;
      const originalHeight = processedVideo.videoHeight;
      
      // Calculate canvas size to fit rotated and zoomed video
      const maxDimension = Math.max(originalWidth, originalHeight);
      const canvasSize = Math.ceil(maxDimension * zoomLevel * 1.5); // Extra space for rotation
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Create MediaRecorder to record the processed video
      const stream = canvas.captureStream(30); // 30 FPS
      
      // Try different codecs for better compatibility
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        videoBitsPerSecond: 2500000 // 2.5 Mbps for good quality
      });
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const processedBlob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(processedBlob);
        setResultUrl(url);
        setProcessing(false);
        setProcessingProgress(0);
      };

      // Start recording
      mediaRecorder.start();

      // Process video frame by frame
      const duration = processedVideo.duration;
      const frameRate = 25; // Slightly lower for better processing
      const totalFrames = Math.floor(duration * frameRate);
      let currentFrame = 0;

      const processFrame = () => {
        if (currentFrame >= totalFrames) {
          // Add a small delay before stopping to ensure last frame is captured
          setTimeout(() => {
            mediaRecorder.stop();
          }, 100);
          return;
        }

        // Update progress
        const progress = Math.round((currentFrame / totalFrames) * 100);
        setProcessingProgress(progress);

        const currentTime = Math.min(currentFrame / frameRate, duration - 0.1);
        processedVideo.currentTime = currentTime;
        
        processedVideo.onseeked = () => {
          // Clear canvas with black background
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Apply transformations and filters
          ctx.save();
          
          // Move to center of canvas
          ctx.translate(canvas.width / 2, canvas.height / 2);
          
          // Apply rotation (tilt)
          ctx.rotate(tiltAngle);
          
          // Apply zoom (scale)
          ctx.scale(zoomLevel, zoomLevel);
          
          // Apply filter based on type and intensity
          let filterString = '';
          switch (settings.filter) {
            case 'brightness':
              filterString = `brightness(${1 + filterIntensity})`;
              break;
            case 'contrast':
              filterString = `contrast(${1 + filterIntensity})`;
              break;
            case 'saturation':
              filterString = `saturate(${1 + filterIntensity})`;
              break;
            case 'sepia':
              filterString = `sepia(${filterIntensity})`;
              break;
          }
          ctx.filter = filterString;
          
          // Draw the video frame centered
          ctx.drawImage(
            processedVideo,
            -originalWidth / 2,
            -originalHeight / 2,
            originalWidth,
            originalHeight
          );
          
          ctx.restore();
          
          currentFrame++;
          
          // Process next frame with proper timing
          setTimeout(processFrame, 40); // ~25 FPS processing
        };
      };

      // Start processing
      processFrame();

    } catch (error) {
      console.error('Video processing failed:', error);
      alert('Video processing failed. Please try a different file.');
      setProcessing(false);
    }
  };

  // Generate CSS filter string for real-time preview
  const generateFilterString = () => {
    const filterIntensity = showCustomSettings ? settings.customFilterIntensity : settings.filterIntensity;
    const tiltAngle = showCustomSettings ? settings.customTilt : settings.tiltAngle;
    const zoomLevel = showCustomSettings ? settings.customZoom : settings.zoomLevel;
    
    let filterString = '';
    
    switch (settings.filter) {
      case 'brightness':
        filterString = `brightness(${1 + filterIntensity})`;
        break;
      case 'contrast':
        filterString = `contrast(${1 + filterIntensity})`;
        break;
      case 'saturation':
        filterString = `saturate(${1 + filterIntensity})`;
        break;
      case 'sepia':
        filterString = `sepia(${filterIntensity})`;
        break;
    }
    
    return {
      filter: filterString,
      transform: `rotate(${tiltAngle}deg) scale(${zoomLevel})`,
    };
  };

  // Apply real-time filters to video
  useEffect(() => {
    if (videoRef.current && file) {
      const { filter, transform } = generateFilterString();
      videoRef.current.style.filter = filter;
      videoRef.current.style.transform = transform;
      videoRef.current.style.transformOrigin = 'center';
    }
  }, [settings, showCustomSettings, file]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [videoUrl, resultUrl]);

  const resetTool = () => {
    setFile(null);
    setResultUrl(null);
    setProcessing(false);
    setProcessingProgress(0);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setShowCustomSettings(false);
    
    // Reset video styles
    if (videoRef.current) {
      videoRef.current.style.filter = '';
      videoRef.current.style.transform = '';
    }
    
    setSettings({
      stripMetadata: true,
      tiltAngle: 0.5,
      zoomLevel: 1.02,
      filter: 'brightness',
      filterIntensity: 0.1,
      customTilt: 0.5,
      customZoom: 1.02,
      customFilterIntensity: 0.1
    });
  };

  return (
    <ToolLayout toolId="video-deduplicator">
      <div className="space-y-5">
        
        {!resultUrl && (
          <>
            {/* File Upload */}
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="text-lg font-bold uppercase mb-1">Upload Video to Process</h3>
                <p className="text-gray-500 font-mono text-sm">Supports: MP4, MOV, AVI, WebM</p>
              </div>
            ) : (
              /* Video Preview */
              <div className="bg-white border-2 border-black p-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <div>
                    <h3 className="font-bold uppercase text-sm">Video Preview</h3>
                    <p className="text-xs text-gray-600 font-mono">{file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs bg-black text-white px-3 py-1 hover:bg-gray-800"
                  >
                    Change Video
                  </button>
                </div>
                
                {videoUrl && (
                  <div className="bg-black p-2 border-2 border-black overflow-hidden">
                    <div className="flex justify-center items-center min-h-[200px]">
                      <video
                        ref={videoRef}
                        controls
                        className="max-w-full max-h-64 transition-all duration-300"
                        src={videoUrl}
                        style={{
                          transformOrigin: 'center',
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
                
                {/* Real-time Preview Info */}
                {videoUrl && (
                  <div className="bg-[#f0f8ff] border-2 border-black p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm">🎨 Live Preview</span>
                        <div className="text-xs text-gray-600 mt-1">
                          {settings.filter} ({((showCustomSettings ? settings.customFilterIntensity : settings.filterIntensity) * 100).toFixed(0)}%) • 
                          {showCustomSettings ? settings.customTilt : settings.tiltAngle}° tilt • 
                          {(((showCustomSettings ? settings.customZoom : settings.zoomLevel) - 1) * 100).toFixed(1)}% zoom
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.style.filter = '';
                            videoRef.current.style.transform = '';
                          }
                          setTimeout(() => {
                            if (videoRef.current && file) {
                              const { filter, transform } = generateFilterString();
                              videoRef.current.style.filter = filter;
                              videoRef.current.style.transform = transform;
                            }
                          }, 100);
                        }}
                        className="text-xs bg-white border border-black px-2 py-1 hover:bg-gray-100"
                      >
                        Reset Preview
                      </button>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            {/* Settings Panel */}
            {file && (
              <div className="bg-white border-2 border-black p-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <h3 className="font-bold uppercase text-sm">Processing Settings</h3>
                  <button
                    onClick={() => setShowCustomSettings(!showCustomSettings)}
                    className="text-xs bg-black text-white px-3 py-1 hover:bg-gray-800"
                  >
                    {showCustomSettings ? 'Use Presets' : 'Customize'}
                  </button>
                </div>

                {/* Metadata Stripping */}
                <div className="flex items-center justify-between p-3 bg-[#ffadad] border-2 border-black">
                  <span className="font-bold">Strip Metadata</span>
                  <input
                    type="checkbox"
                    checked={settings.stripMetadata}
                    onChange={(e) => setSettings(prev => ({ ...prev, stripMetadata: e.target.checked }))}
                    className="w-4 h-4"
                  />
                </div>

                {!showCustomSettings ? (
                  /* Preset Settings */
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#ffd6a5] border-2 border-black">
                        <span className="font-bold block text-sm mb-1">Tilt</span>
                        <span className="text-lg">{settings.tiltAngle}°</span>
                      </div>
                      <div className="p-3 bg-[#fdffb6] border-2 border-black">
                        <span className="font-bold block text-sm mb-1">Zoom</span>
                        <span className="text-lg">{((settings.zoomLevel - 1) * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#9bf6ff] border-2 border-black">
                      <span className="font-bold block text-sm mb-2">Filter</span>
                      <div className="flex gap-2 flex-wrap">
                        {['brightness', 'contrast', 'saturation', 'sepia'].map(filter => (
                          <button
                            key={filter}
                            onClick={() => setSettings(prev => ({ ...prev, filter }))}
                            className={`px-3 py-1 text-sm font-bold border-2 border-black transition-all ${
                              settings.filter === filter ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Custom Settings */
                  <>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#ffd6a5] border-2 border-black">
                        <label className="font-bold block text-sm mb-2">Tilt Angle: {settings.customTilt}°</label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={settings.customTilt}
                          onChange={(e) => setSettings(prev => ({ ...prev, customTilt: parseFloat(e.target.value) }))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-3 bg-[#fdffb6] border-2 border-black">
                        <label className="font-bold block text-sm mb-2">Zoom Level: {((settings.customZoom - 1) * 100).toFixed(1)}%</label>
                        <input
                          type="range"
                          min="1"
                          max="1.1"
                          step="0.01"
                          value={settings.customZoom}
                          onChange={(e) => setSettings(prev => ({ ...prev, customZoom: parseFloat(e.target.value) }))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-3 bg-[#9bf6ff] border-2 border-black">
                        <label className="font-bold block text-sm mb-2">Filter Intensity: {(settings.customFilterIntensity * 100).toFixed(0)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="0.3"
                          step="0.01"
                          value={settings.customFilterIntensity}
                          onChange={(e) => setSettings(prev => ({ ...prev, customFilterIntensity: parseFloat(e.target.value) }))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-3 bg-[#e8d5ff] border-2 border-black">
                        <span className="font-bold block text-sm mb-2">Filter Type</span>
                        <div className="flex gap-2 flex-wrap">
                          {['brightness', 'contrast', 'saturation', 'sepia'].map(filter => (
                            <button
                              key={filter}
                              onClick={() => setSettings(prev => ({ ...prev, filter }))}
                              className={`px-3 py-1 text-sm font-bold border-2 border-black transition-all ${
                                settings.filter === filter ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'
                              }`}
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {processing && (
                  <div className="bg-white border-2 border-black p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">Processing Video...</span>
                      <span className="text-sm">{processingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 border-2 border-black">
                      <div
                        className="bg-[#a8e6cf] h-full transition-all duration-300"
                        style={{ width: `${processingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <NeoButton
                  onClick={processVideo}
                  disabled={processing}
                  className="w-full py-3"
                >
                  {processing ? `Processing... ${processingProgress}%` : 'Process Video'}
                </NeoButton>
              </div>
            )}
          </>
        )}

        {/* Result */}
        {resultUrl && (
          <div className="bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black uppercase">Video Processed!</h3>
              <button
                onClick={resetTool}
                className="text-sm font-bold uppercase hover:underline"
              >
                ← Process Another
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-black p-3">
                <div className="bg-black p-2 border-2 border-black">
                  <video
                    controls
                    className="w-full max-h-64 mx-auto border border-gray-200"
                    src={resultUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">
                  Processed video with {settings.filter} filter, {showCustomSettings ? settings.customTilt : settings.tiltAngle}° tilt, 
                  and {(((showCustomSettings ? settings.customZoom : settings.zoomLevel) - 1) * 100).toFixed(1)}% zoom
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-[#ffadad] border-2 border-black">
                  <span className="font-bold block">Metadata</span>
                  <span>{settings.stripMetadata ? 'Removed' : 'Preserved'}</span>
                </div>
                <div className="p-3 bg-[#ffd6a5] border-2 border-black">
                  <span className="font-bold block">Transformations</span>
                  <span>Tilt + Zoom + Filter</span>
                </div>
              </div>

              <a
                href={resultUrl}
                download={`processed-${file?.name || 'video'}`}
                className="block w-full text-center bg-black text-white font-bold py-3 hover:bg-white hover:text-black border-2 border-black transition-all"
              >
                Download Processed Video
              </a>
            </div>
          </div>
        )}

      </div>
    </ToolLayout>
  );
};