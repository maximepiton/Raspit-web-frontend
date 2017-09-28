;----------------------------------------------------------------------
; write_csv_5.ncl
;
; Concepts illustrated:
;   - Writing a CSV file with a header using write_table
;   - Appending data of mixed types to a CSV file inside a loop
;   - Writing select WRF-ARW data to a CSV file
;----------------------------------------------------------------------
; This example calculates temperature at 2m from a WRF-ARW output
; file, and writes a subset of the data based on an array of
; lat / lon values.
;----------------------------------------------------------------------
; These files are loaded by default in NCL V6.4.0 and newer
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_code.ncl"
; load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_csm.ncl"
; load "$NCARG_ROOT/lib/ncarg/nclscripts/wrf/WRFUserARW.ncl"

begin
  ;dir   = "./"
  ;files = systemfunc (" ls -1 " + dir + "wrfout_d01_2008-09* ")
  ;a     = addfiles(files+".nc","r")
  a = addfiles("wrf.nc","r")

  times = wrf_user_list_times(a)         ; "2008-09-29_18:30:00", etc
  ua   = wrf_user_getvar(a,"ua",-1)     ; ua en ua (unité absolue)
  va   = wrf_user_getvar(a,"va",-1)     ; ua en ua (unité absolue)
  z   = wrf_user_getvar(a,"z",-1)     ; ua en ua (unité absolue)
  nalt = dimsizes(z(0,:,0,0))
	print("nalt === " + nalt)




  times  = wrf_user_list_times(a)
  ntimes = dimsizes(times)
  print("ntimes = " + ntimes)

;---Calculate i,j locations of data closest to set of lat/lon points
  ;lats = (/ 41, 42, 43/)
  ;lons = (/-1,0,1/)
  ;lats = (/41/)
  ;lons = (/-1/)
  lats = lat
  lons = lon
  nlatlon = dimsizes(lats)
	print("nlatlon = " + nlatlon)
  loc = wrf_user_ll_to_ij(a, lons, lats, True)   ; 2 x nlatnlon
  loc = loc- 1                                  ; NCL wants values from 0 to n-1
  print(loc)

;---Set up CSV file and header information for the file
  csv_filename = "ua_va_fnct_alt.csv"
  system("rm -f " + csv_filename)                ; Remove file in case it exists.
  fields = (/"TIME", "LAT", "LON", "UA (en UA)", "VA","Altitude"/)

;---Create a header line for CSV file
  dq     = str_get_dq()
  fields = dq + fields + dq                      ; Pre/append quotes to field names
  header = [/str_join(fields,",")/]              ; Header is field names separated
                                                 ; by commas.
;
; Format to use for writing each variable to CSV file.
; If you don't want spaces in CSV file, use the following
; format string:
;     format = "%s,%g,%g,%g"
; 
format = "%s,%6.2f,%7.2f,%6.2f,%6.2f,%6.2f"

;
; Loop through each time step and desired list of lat/lon values,
; and write a single line of data to CSV file.
;
  write_table(csv_filename, "w", header, "%s")   ; Write header to CSV file.
  do it = 0,ntimes-1 ; Loop over Time
    do nl = 0,nlatlon-1 ; Loop over Points
	do nz = 0,nalt-1 ; Loop over altitude
	nln   = loc(0)
	nlt   = loc(1)
	;print(ua)
	lat1  = a[0]->XLAT(0,nlt,nln)    ; nearest grid point
	lon1  = a[0]->XLONG(0,nlt,nln)
	; Store data to be written in a list.
	alist = [/times(it),lat1,lon1,ua(it,nz,nlt,nln),va(it,nz,nlt,nln),z(it,nz,nlt,nln)/]   
	write_table(csv_filename, "a", alist, format)     ; Write list to CSV file.
      end do
    end do
  end do
end


