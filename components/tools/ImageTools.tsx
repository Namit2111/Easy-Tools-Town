import React, { useState, useRef } from 'react';
import ConverterTool from '../templates/ConverterTool';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';
import { convertImageFormat } from '../../services/imageService';

export const ImageConverterTool = () => {
  return (
    <ConverterTool
      toolId="img-convert"
      accept="image/*"
      outputFormatOptions={['JPG', 'PNG']}
      buttonLabel="Convert Format"
      downloadExtension="png"
      onConvert={async (file, option) => {
        return await convertImageFormat(file, option as 'JPG' | 'PNG');
      }}
    />
  );
}

// --- Image Rotator ---
export const ImageRotateTool = () => {
  return (
    <ConverterTool
      toolId="img-rotate"
      accept="image/*"
      outputFormatOptions={['90°', '180°', '270°']}
      buttonLabel="Rotate Image"
      downloadExtension="png"
      onConvert={async (file, option) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const angle = parseInt(option || '90');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            if (angle === 90 || angle === 270) {
              canvas.width = img.height;
              canvas.height = img.width;
            } else {
              canvas.width = img.width;
              canvas.height = img.height;
            }

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Failed to create blob'));
            }, 'image/png');
          };

          img.onerror = reject;
          img.src = url;
        });
      }}
    />
  );
};

// --- Grayscale Converter ---
export const ImageGrayscaleTool = () => {
  return (
    <ConverterTool
      toolId="img-gray"
      accept="image/*"
      buttonLabel="Convert to Grayscale"
      downloadExtension="png"
      onConvert={async (file) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              data[i] = data[i + 1] = data[i + 2] = gray;
            }

            ctx.putImageData(imageData, 0, 0);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Failed to create blob'));
            }, 'image/png');
          };

          img.onerror = reject;
          img.src = url;
        });
      }}
    />
  );
};

// --- Image Compressor ---
export const ImageCompressorTool = () => {
  return (
    <ConverterTool
      toolId="img-compress"
      accept="image/*"
      outputFormatOptions={['High (0.8)', 'Medium (0.6)', 'Low (0.4)']}
      buttonLabel="Compress Image"
      downloadExtension="jpg"
      onConvert={async (file, option) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            let quality = 0.8;
            if (option?.includes('0.6')) quality = 0.6;
            if (option?.includes('0.4')) quality = 0.4;

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Failed to compress image'));
            }, 'image/jpeg', quality);
          };

          img.onerror = reject;
          img.src = url;
        });
      }}
    />
  );
};

// --- Image Resizer ---
export const ImageResizerTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setResultUrl(null);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);

      const img = new Image();
      img.onload = () => {
        setOriginalSize({ w: img.width, h: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainRatio && originalSize.w > 0) {
      setHeight(Math.round((newWidth / originalSize.w) * originalSize.h));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainRatio && originalSize.h > 0) {
      setWidth(Math.round((newHeight / originalSize.h) * originalSize.w));
    }
  };

  const handleResize = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) setResultUrl(URL.createObjectURL(blob));
      }, 'image/png');
    };
    img.src = previewUrl!;
  };

  return (
    <ToolLayout toolId="img-resize">
      <div className="space-y-5">
        {!resultUrl && (
          <>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto border-2 border-black" />
              ) : (
                <div className="text-4xl mb-3">📐</div>
              )}
              <h3 className="text-lg font-bold uppercase">{file ? file.name : 'Upload Image to Resize'}</h3>
            </div>

            {file && (
              <div className="bg-white border-2 border-black p-5 space-y-4">
                <div className="text-sm text-gray-600">Original: {originalSize.w} x {originalSize.h}px</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Width (px)</label>
                    <input type="number" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} className="w-full p-3 border-2 border-black" />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Height (px)</label>
                    <input type="number" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} className="w-full p-3 border-2 border-black" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="w-5 h-5" />
                  <span className="font-bold">Maintain aspect ratio</span>
                </label>
                <NeoButton onClick={handleResize} className="w-full py-3">Resize Image</NeoButton>
              </div>
            )}
          </>
        )}

        {resultUrl && (
          <div className="bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black uppercase">Resized to {width} x {height}px</h3>
              <button onClick={() => { setResultUrl(null); setFile(null); setPreviewUrl(null); }} className="text-sm font-bold hover:underline">← New Image</button>
            </div>
            <img src={resultUrl} alt="Resized" className="max-h-56 mx-auto border-2 border-black mb-4" />
            <a href={resultUrl} download={`resized-${Date.now()}.png`} className="block w-full text-center bg-black text-white font-bold py-3 hover:bg-white hover:text-black border-2 border-black transition-all">
              Download Resized Image
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// --- Image Cropper ---
export const ImageCropperTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setResultUrl(null);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);

      const img = new Image();
      img.onload = () => {
        setOriginalSize({ w: img.width, h: img.height });
        setCropW(Math.min(200, img.width));
        setCropH(Math.min(200, img.height));
      };
      img.src = url;
    }
  };

  const handleCrop = () => {
    if (!previewUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      canvas.toBlob((blob) => {
        if (blob) setResultUrl(URL.createObjectURL(blob));
      }, 'image/png');
    };
    img.src = previewUrl;
  };

  return (
    <ToolLayout toolId="img-crop">
      <div className="space-y-5">
        {!resultUrl && (
          <>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto border-2 border-black" />
              ) : (
                <div className="text-4xl mb-3">✂️</div>
              )}
              <h3 className="text-lg font-bold uppercase">{file ? file.name : 'Upload Image to Crop'}</h3>
            </div>

            {file && (
              <div className="bg-white border-2 border-black p-5 space-y-4">
                <div className="text-sm text-gray-600">Image size: {originalSize.w} x {originalSize.h}px</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Start X</label>
                    <input type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} min={0} max={originalSize.w - cropW} className="w-full p-3 border-2 border-black" />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Start Y</label>
                    <input type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} min={0} max={originalSize.h - cropH} className="w-full p-3 border-2 border-black" />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Width</label>
                    <input type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} min={1} max={originalSize.w - cropX} className="w-full p-3 border-2 border-black" />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">Height</label>
                    <input type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} min={1} max={originalSize.h - cropY} className="w-full p-3 border-2 border-black" />
                  </div>
                </div>
                <NeoButton onClick={handleCrop} className="w-full py-3">Crop Image</NeoButton>
              </div>
            )}
          </>
        )}

        {resultUrl && (
          <div className="bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black uppercase">Cropped ({cropW} x {cropH}px)</h3>
              <button onClick={() => { setResultUrl(null); setFile(null); setPreviewUrl(null); }} className="text-sm font-bold hover:underline">← New Image</button>
            </div>
            <img src={resultUrl} alt="Cropped" className="max-h-56 mx-auto border-2 border-black mb-4" />
            <a href={resultUrl} download={`cropped-${Date.now()}.png`} className="block w-full text-center bg-black text-white font-bold py-3 hover:bg-white hover:text-black border-2 border-black transition-all">
              Download Cropped Image
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};