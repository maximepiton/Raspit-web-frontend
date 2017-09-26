;*************************************************
; wind_1.ncl
;*************************************************
;
; These files are loaded by default in NCL V6.2.0 and newer
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_code.ncl"   
load "/usr/lib/ncarg/nclscripts/csm/gsn_csm.ncl"    
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/contributed.ncl" 
;*************************************************
begin
;*************************************************
; open file and read in data: data are on a Gaussian grid
;*************************************************
  ;f    = addfile ("/usr/lib/ncarg/data/cdf/uv300.nc", "r")
  f    = addfile ("./wrf.nc", "r")
  u    = f->U
  v    = f->V

;*************************************************
; calculate divergence: Use Wrap to include meta data
;*************************************************
  div = uv2dvG_Wrap(u,v)                ; u,v ==> divergence

;*************************************************
; calculate divergent wind components 
;*************************************************    
  ud    = new ( dimsizes(u), typeof(u), u@_FillValue )
  vd    = new ( dimsizes(v), typeof(v), v@_FillValue )

  dv2uvg(div,ud,vd) ; div  ==> divergent  wind components

  copy_VarCoords(u, ud ) 
  copy_VarCoords(u, vd ) 
  ud@long_name  = "Zonal Divergent Wind"
  ud@units      = u@units
  vd@long_name  = "Meridional Divergent Wind"
  vd@units      = v@units
;*************************************************
; plot results
;*************************************************    
  wks  = gsn_open_wks("png","wind")           ; send graphics to PNG file
                                             
  res                 = True
  res@vcRefMagnitudeF = 3.                    ; make vectors larger
  res@vcRefLengthF    = 0.050                 ; reference vector length
  res@vcGlyphStyle    = "CurlyVector"         ; turn on curly vectors
  res@vcMinDistanceF  = 0.012                 ; thin the vectors

  res@gsnLeftString   = "Divergent Wind"
                                              ; plot 1st time step
  plot= gsn_csm_vector_map(wks,ud(0,:,:),vd(0,:,:),res)

end
