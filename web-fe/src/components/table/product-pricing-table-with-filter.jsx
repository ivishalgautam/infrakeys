"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  Filter,
  Search,
  X,
  MapPin,
  Tag,
  Calendar,
} from "lucide-react";
import { rupee } from "@/lib/Intl";
import moment from "moment";

export default function ProductPricingTable({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customProperties, setCustomProperties] = useState({});
  const [filters, setFilters] = useState({});
  const [placeFilter, setPlaceFilter] = useState([]);

  const handleFilterChange = (propertyName, value, checked) => {
    setFilters((prev) => {
      const currentValues = prev[propertyName] || [];
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [propertyName]: updatedValues,
      };
    });
  };

  const handlePlaceFilterChange = (place, checked) => {
    setPlaceFilter((prev) =>
      checked ? [...prev, place] : prev.filter((p) => p !== place),
    );
  };

  const clearAllFilters = () => {
    setFilters({});
    setPlaceFilter([]);
    setSearchTerm("");
  };

  const getFilteredProducts = useCallback(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.place.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Place filter
    if (placeFilter.length > 0) {
      filtered = filtered.filter((product) =>
        placeFilter.includes(product.place.toLowerCase()),
      );
    }

    // Custom properties filter
    if (Object.keys(filters).some((key) => filters[key].length > 0)) {
      filtered = filtered.filter((product) => {
        return Object.keys(filters).every((filterKey) => {
          if (filters[filterKey].length === 0) return true;

          return product.custom_properties.some(
            (cp) =>
              cp.name.toLowerCase() === filterKey.toLowerCase() &&
              cp.values.some((value) =>
                filters[filterKey].includes(value.toLowerCase()),
              ),
          );
        });
      });
    }

    return filtered;
  }, [products, searchTerm, placeFilter, filters]);

  const getUniquePlaces = () => {
    return [...new Set(products.map((p) => p.place.toLowerCase()))];
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).flat().length + placeFilter.length;
  };

  useEffect(() => {
    // Extract all custom properties
    const properties = {};

    products.forEach((product) => {
      product.custom_properties.forEach((cp) => {
        const name = cp.name.toLowerCase();
        if (!properties[name]) {
          properties[name] = new Set();
        }
        cp.values.forEach((value) => {
          properties[name].add(value.toLowerCase());
        });
      });
    });

    // Convert Sets to arrays
    const propertiesObj = {};
    Object.keys(properties).forEach((key) => {
      propertiesObj[key] = Array.from(properties[key]);
    });

    setCustomProperties(propertiesObj);
  }, [products]);

  const filteredProducts = getFilteredProducts();

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Pricing</h2>
          <p className="text-muted-foreground">
            Manage and filter your product catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="text-sm">
            {filteredProducts.length} of {products.length} products
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products or places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2">
            {/* Place Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Places
                  {placeFilter.length > 0 && (
                    <Badge className="ml-1 rounded-full text-xs">
                      {placeFilter.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Place</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {getUniquePlaces().map((place) => (
                  <DropdownMenuItem
                    key={place}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`place-${place}`}
                      checked={placeFilter.includes(place)}
                      onCheckedChange={(checked) =>
                        handlePlaceFilterChange(place, checked)
                      }
                    />
                    <label
                      htmlFor={`place-${place}`}
                      className="flex-1 cursor-pointer capitalize"
                    >
                      {place}
                    </label>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Custom Property Filters */}
            {Object.keys(customProperties).map((propertyName) => (
              <DropdownMenu key={propertyName}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Tag className="h-4 w-4" />
                    <span className="capitalize">{propertyName}</span>
                    {filters[propertyName]?.length > 0 && (
                      <Badge className="ml-1 rounded-full text-xs">
                        {filters[propertyName].length}
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 w-56 overflow-y-auto">
                  <DropdownMenuLabel className="capitalize">
                    {propertyName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {customProperties[propertyName].map((value) => (
                    <DropdownMenuItem
                      key={value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`${propertyName}-${value}`}
                        checked={
                          filters[propertyName]?.includes(value) || false
                        }
                        onCheckedChange={(checked) =>
                          handleFilterChange(propertyName, value, checked)
                        }
                      />
                      <label
                        htmlFor={`${propertyName}-${value}`}
                        className="flex-1 cursor-pointer capitalize"
                      >
                        {value}
                      </label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {/* Clear Filters */}
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Clear all ({getActiveFiltersCount()})
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {placeFilter.map((place) => (
                <Badge key={place} className="gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="capitalize">{place}</span>
                  <button
                    onClick={() => handlePlaceFilterChange(place, false)}
                    className="ml-1 rounded-full hover:bg-secondary-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {Object.entries(filters).map(([key, values]) =>
                values.map((value) => (
                  <Badge key={`${key}-${value}`} className="gap-1 bg-primary">
                    <Tag className="h-3 w-3" />
                    <span className="capitalize">
                      {key}: {value}
                    </span>
                    <button
                      onClick={() => handleFilterChange(key, value, false)}
                      className="ml-1 rounded-full hover:bg-secondary-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )),
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className="cursor-pointer transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-semibold">{product.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{product.place}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.custom_properties
                            .slice(0, 2)
                            .map((cp, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {cp.name}: {cp.values.slice(0, 2).join(", ")}
                                {cp.values.length > 2 && "..."}
                              </Badge>
                            ))}
                          {product.custom_properties.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.custom_properties.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-right font-semibold">
                        {rupee.format(product.price)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center justify-end gap-1">
                          <Calendar className="h-3 w-3" />
                          {moment(product.updated_at).format("DD MMM YYYY")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
